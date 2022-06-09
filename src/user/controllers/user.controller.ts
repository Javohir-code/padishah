import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { UserDetailsDto } from '../dto/user.details.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IRequestUser } from '../interfaces/request-user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add-details')
  @UseGuards(JwtAuthGuard)
  async addUser(
    @CurrentUser() user: IRequestUser,
    @Body() userDetailsDto: UserDetailsDto
  ): Promise<{ user: UserEntity; accessToken: string }> {
    return await this.userService.addUser(user, userDetailsDto);
  }

  @Post('login')
  async loginUser(@Body('msisdn') msisdn: string) {
    return await this.userService.loginUser(msisdn);
  }

  @Post('verify')
  async verifyTheNumber(
    @Body('msisdn') msisdn: string,
    @Body('code') code: number
  ): Promise<{ accessToken: string }> {
    return await this.userService.verifyTheNumber(msisdn, code);
  }
}
