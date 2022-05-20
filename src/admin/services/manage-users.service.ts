import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageUsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async removeUser(userId: number): Promise<void> {
    const user = await this.userService.findUser(userId);
    await this.userRepository.delete(user.userId);
  }
}
