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

  async getUsers(
    page?: number,
    limit?: number,
  ): Promise<UserEntity[] | { users: UserEntity[]; count: number }> {
    if (!page && !limit) {
      return await this.userRepository.find({ order: { createdAt: 'DESC' } });
    }
    const users = await this.userRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: limit * (page - 1),
      take: limit,
    });
    return { users: users[0], count: users[1] };
  }

  async removeUser(userId: number): Promise<void> {
    const user = await this.userService.findUser(userId);
    await this.userRepository.delete(user.userId);
  }
}
