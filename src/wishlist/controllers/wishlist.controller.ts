import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { IRequestUser } from 'src/user/interfaces/request-user.interface';
import { WishlistDto } from '../dto/wishlist-details.dto';
import { WishlistEntity } from '../entities/wishlist.entity';
import { WishlistService } from '../services/wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('add-wishlist')
  @UseGuards(JwtAuthGuard)
  async addToWishlist(
    @CurrentUser() user: IRequestUser,
    @Body() wishlistDto: WishlistDto
  ): Promise<WishlistEntity> {
    return await this.wishlistService.addToWishlist(user, wishlistDto);
  }

  @Get('wishlist-list')
  @UseGuards(JwtAuthGuard)
  async getWishlistByUserWise(
    @CurrentUser() user: IRequestUser
  ): Promise<WishlistEntity[]> {
    return await this.wishlistService.getWishlistByUserWise(user);
  }

  @Delete('remove/:wishId')
  @UseGuards(JwtAuthGuard)
  async deletewishlist(
    @CurrentUser() user: IRequestUser,
    @Param('wishId', ParseIntPipe) wishId: number
  ): Promise<void> {
    await this.wishlistService.deletewishlist(user, wishId);
  }
}
