import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminDetailsDto } from '../dto/admin.details.dto';
import { AdminLoginDto } from '../dto/admin.login.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { ILogin } from '../interfaces/login.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAdmin(adminDetailsDto: AdminDetailsDto): Promise<AdminEntity> {
    const newAdmin = await this.adminRepository.create(adminDetailsDto);
    await this.adminRepository.save(newAdmin);
    return newAdmin;
  }

  async validateAdmin(adminLoginDto: AdminLoginDto): Promise<ILogin> {
    const admin = await this.findByEmail(adminLoginDto.email);
    if (admin && compareSync(adminLoginDto.password, admin.password)) {
      const payload = {
        id: admin.id,
        email: admin.email,
      };

      return {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        token: this.jwtService.sign(payload),
      };
    }

    throw new BadRequestException({
      message:
        'Either Email or Password incorrect, Please check your credentials.',
    });
  }

  private async findByEmail(email: string): Promise<AdminEntity> {
    return await this.adminRepository.findOne({ where: { email: email } });
  }
}
