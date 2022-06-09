import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WishlistController } from './controllers/wishlist.controller';
import { WishlistService } from './services/wishlist.service';
import configuration from '../global/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forFeature([WishlistEntity]),
    UserModule
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [TypeOrmModule.forFeature([WishlistEntity]), WishlistService]
})
export class WishlistModule {}
