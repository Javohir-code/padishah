import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminDetailsDto } from '../dto/admin.details.dto';
import { AdminLoginDto } from '../dto/admin.login.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminEntity } from '../entities/admin.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ILogin } from '../interfaces/login.interface';
import { IAdmin } from '../interfaces/update-admin.interface';
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

  @Post('admin/edit')
  @UseGuards(AdminJwtAuthGuard)
  async updateAdminCredentials(
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<IAdmin> {
    return await this.adminService.updateAdminCredentials(
      updateAdminDto.id,
      updateAdminDto.firstName,
      updateAdminDto.lastName,
      updateAdminDto.email,
      updateAdminDto.password,
    );
  }
}
