import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { StoreEntity } from 'src/store/entities/store.entity';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IRequestUser } from 'src/user/interfaces/request-user.interface';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { WishlistDto } from '../dto/wishlist-details.dto';
import { WishlistEntity } from '../entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistEntity)
    private wishlistRepository: Repository<WishlistEntity>,
    private userService: UserService,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async addToWishlist(
    user: IRequestUser,
    wishlistDto: WishlistDto
  ): Promise<WishlistEntity> {
    const found = await this.userRepository.findOne({
      where: { msisdn: user.msisdn }
    });
    if (!found) {
      throw new NotFoundException('user not found!');
    }
    const newWishlist = await this.wishlistRepository.create();
    newWishlist.productId = wishlistDto.productId;
    newWishlist.userId = found.userId;
    await this.wishlistRepository.save(newWishlist);
    return newWishlist;
  }

  async getWishlistByUserWise(user: IRequestUser): Promise<WishlistEntity[]> {
    const found = await this.userRepository.findOne({
      where: { msisdn: user.msisdn }
    });
    if (!found) {
      throw new NotFoundException('user not found!');
    }

    return await this.wishlistRepository
      .createQueryBuilder('W')
      .where('W.userId = :userId', { userId: found.userId })
      .leftJoin(ProductEntity, 'P', 'P.productId = W.productId')
      .leftJoin(CategoryEntity, 'C', 'C.categoryId = P.categoryId')
      .leftJoin(SubCategoryEntity, 'S', 'S.subCategoryId = P.subCategoryId')
      .leftJoin(StoreEntity, 'St', 'St.storeId = P.storeId')
      .leftJoin(BrandEntity, 'B', 'B.brandId = P.brandId')
      .select([
        'W.wishId AS wishId',
        'W.createdAt AS createdAt',
        'P.*',
        'C.name AS categoryName',
        'S.name AS subCategoryName',
        'St.name AS storeName',
        'B.name AS brandName'
      ])
      .orderBy('W.createdAt', 'DESC')
      .getRawMany();
  }

  private async getWishlistById(wishId: number): Promise<WishlistEntity> {
    const wishlist = await this.wishlistRepository.findOneBy({ wishId });
    if (!wishlist) {
      throw new NotFoundException('wishlist does not exist!');
    }
    return wishlist;
  }

  async deletewishlist(user: IRequestUser, wishId: number): Promise<void> {
    const wishlist = await this.getWishlistById(wishId);
    if(wishlist) {
      const found = await this.userRepository.findOne({
        where: { msisdn: user.msisdn }
      });
      if (!found) {
        throw new NotFoundException('user not found!');
      }
      if (wishlist.userId === found.userId) {
        await this.wishlistRepository.delete(wishId);
      } else {
        throw new BadRequestException(
          'This user does not have access to delete this wishlist!'
        );
      }
    }
  
  }
}
