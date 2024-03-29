import {
  BadRequestException,
  Injectable,
  NotFoundException
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
import { IRequestUser } from '../interfaces/request-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
    private readonly jwtService: JwtService
  ) {}

  async addUser(
    IUser: IRequestUser,
    userDetailsDto: UserDetailsDto
  ): Promise<{ user: UserEntity; accessToken: string }> {
    const foundUser = await this.findUserByMsisdn(IUser.msisdn);
    if (foundUser) {
      foundUser.fullName = userDetailsDto.fullName;
      foundUser.region = userDetailsDto.region;
      foundUser.district = userDetailsDto.district;
      foundUser.address = userDetailsDto.address;
      foundUser.address2 = userDetailsDto.address2;
      const user = await this.userRepository.save({ ...foundUser, foundUser });
      const payload = { msisdn: user.msisdn };
      const accessToken = await this.jwtService.sign(payload);
      return { user: foundUser, accessToken: accessToken };
    }
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
    const res = await fetch(this.configService.get('sms_service.url'), {
      method: 'POST',
      headers: {
        login: this.configService.get('sms_service.username'),
        password: this.configService.get('sms_service.password'),
        Authorization: this.configService.get('sms_service.auth'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            recipient: msisdn,
            'message-id': `pad${uuidv4().substr(0, 15)}`,
            sms: {
              originator: this.configService.get('sms_service.orginator'),
              content: {
                text: `Код подтверждения для Padishah: ${code}`
              }
            }
          }
        ]
      })
    });
    const loginDto = { msisdn: msisdn, code: code };
    const newLogin = await this.loginRepository.create(loginDto);
    await this.loginRepository.save(newLogin);
    const foundUser = await this.findUserMsisdnWise(msisdn);
    if (foundUser == true) {
      const user = await this.userRepository.create();
      user.msisdn = msisdn;
      await this.userRepository.save(user);
    }

    return res;
  }

  private generate4RandomDigit() {
    const val = Math.floor(1000 + Math.random() * 9000);
    return val;
  }

  async verifyTheNumber(
    msisdn: string,
    codeNum: number
  ): Promise<{ accessToken: string }> {
    const loginInfo = await this.loginRepository.findOne({
      where: { msisdn: msisdn, code: codeNum }
    });
    if (!loginInfo) throw new BadRequestException('Invalid Code!');

    const payload = { msisdn: msisdn };
    const accessToken = await this.jwtService.sign(payload);
    const result = await this.loginRepository.delete(loginInfo.loginId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `msisdn with "${loginInfo.loginId}" not found!`
      );
    }
    return { accessToken };
  }

  private async findUserMsisdnWise(msisdn: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ msisdn });
    if (!user) {
      return true;
    } else {
      return false;
    }
  }

  async findUserByMsisdn(msisdn: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { msisdn: msisdn }
    });
    if (!user) {
      throw new NotFoundException('user not found with given phone number');
    }
    return user;
  }
}
