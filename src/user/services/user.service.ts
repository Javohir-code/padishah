import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDetailsDto } from '../dto/user.details.dto';
import { UserEntity } from '../entities/user.entity';
import fetch from 'cross-fetch';
import { v4 as uuidv4 } from 'uuid';
import { LoginEntity } from '../entities/login.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async addUser(userDetailsDto: UserDetailsDto): Promise<UserEntity> {
    const newUser = await this.userRepository.create(userDetailsDto);
    const user = await this.userRepository.save(newUser);
    return user;
  }

  async findUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  async loginUser(msisdn: string) {
    const code = this.generate4RandomDigit();
    console.log(code);
    const res = await fetch(this.configService.get('sms_service.url'), {
      method: 'POST',
      headers: {
        login: this.configService.get('sms_service.username'),
        password: this.configService.get('sms_service.password'),
        Authorization: this.configService.get('sms_service.auth'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            recipient: msisdn,
            'message-id': `pad${uuidv4().substr(0, 15)}`,
            sms: {
              originator: this.configService.get('sms_service.orginator'),
              content: {
                text: `Padishah code: ${code}`,
              },
            },
          },
        ],
      }),
    });
    const loginDto = { msisdn: msisdn, code: code };
    const newLogin = await this.loginRepository.create(loginDto);
    await this.loginRepository.save(newLogin);
    return res;
  }

  private generate4RandomDigit() {
    const val = Math.floor(1000 + Math.random() * 9000);
    return val;
  }

  async verifyTheNumber(
    msisdn: string,
    codeNum: number,
  ): Promise<{ accessToken: string }> {
    const loginInfo = await this.loginRepository.findOne({
      where: { msisdn: msisdn, code: codeNum },
    });
    if (!loginInfo) throw new UnauthorizedException('Invalid Code!');

    const payload = { msisdn: msisdn, createdAt: loginInfo.createdAt };
    const accessToken = await this.jwtService.sign(payload);
    const result = await this.loginRepository.delete(loginInfo.loginId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `msisdn with "${loginInfo.loginId}" not found!`,
      );
    }
    return { accessToken };
  }
}
