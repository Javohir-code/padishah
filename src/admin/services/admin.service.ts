import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { AdminDetailsDto } from '../dto/admin.details.dto';
import { AdminLoginDto } from '../dto/admin.login.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { ILogin } from '../interfaces/login.interface';
import { IAdmin } from '../interfaces/update-admin.interface';
import { hash } from 'bcryptjs';

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

  private async findAdminById(id: number): Promise<AdminEntity> {
    return await this.adminRepository.findOneBy({ id });
  }

  async updateAdminCredentials(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
  ): Promise<IAdmin> {
    const admin = await this.findAdminById(id);
    admin.firstName = firstName ? firstName : admin.firstName;
    admin.lastName = lastName ? lastName : admin.lastName;
    admin.email = email ? email : admin.email;
    admin.password = password ? await hash(password, 10) : admin.password;
    const updated = await this.adminRepository.save({ ...admin });
    delete updated.password;
    return updated;
  }
}
