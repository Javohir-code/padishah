import { Body, Controller, Post } from '@nestjs/common';
import { UserDetailsDto } from '../dto/user.details.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add-details')
  async addUser(
    @Body() userDetailsDto: UserDetailsDto,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    return await this.userService.addUser(userDetailsDto);
  }

  @Post('login')
  async loginUser(@Body('msisdn') msisdn: string) {
    return await this.userService.loginUser(msisdn);
  }

  @Post('verify')
  async verifyTheNumber(
    @Body('msisdn') msisdn: string,
    @Body('code') code: number,
  ): Promise<{ accessToken: string }> {
    return await this.userService.verifyTheNumber(msisdn, code);
  }
}
