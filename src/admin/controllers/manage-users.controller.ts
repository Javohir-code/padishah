import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationParams } from 'src/global/dto/pagination.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageUsersService } from '../services/manage-users.service';

@Controller()
export class ManageUsersController {
  constructor(private manageUsersService: ManageUsersService) {}

  @Get('admin/users-list')
  @UseGuards(AdminJwtAuthGuard)
  async getUsers(
    @Query() { page, limit }: PaginationParams,
  ): Promise<UserEntity[] | { users: UserEntity[]; count: number }> {
    return await this.manageUsersService.getUsers(page, limit);
  }

  @Delete('admin/user/:userId')
  @UseGuards(AdminJwtAuthGuard)
  async removeUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.manageUsersService.removeUser(userId);
  }
}
