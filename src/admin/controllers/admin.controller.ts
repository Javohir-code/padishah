import { Body, Controller, Post } from '@nestjs/common';
import { AdminDetailsDto } from '../dto/admin.details.dto';
import { AdminLoginDto } from '../dto/admin.login.dto';
import { AdminEntity } from '../entities/admin.entity';
import { ILogin } from '../interfaces/login.interface';
import { AdminService } from '../services/admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('admin/register')
  async registerAdmin(
    @Body() adminDetailsDto: AdminDetailsDto,
  ): Promise<AdminEntity> {
    return await this.adminService.registerAdmin(adminDetailsDto);
  }

  @Post('admin/login')
  async validateAdmin(@Body() adminLoginDto: AdminLoginDto): Promise<ILogin> {
    return await this.adminService.validateAdmin(adminLoginDto);
  }
}
