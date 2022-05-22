import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';
import { SubCategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './controllers/admin.controller';
import { ManageCategoriesController } from './controllers/manage-categories.contoller';
import { ManageProductsController } from './controllers/manage-products.controller';
import { ManageStoresController } from './controllers/manage-stores.controller';
import { ManageSubCategoriesController } from './controllers/manage-subcategories.controller';
import { ManageUsersController } from './controllers/manage-users.controller';
import { AdminEntity } from './entities/admin.entity';
import { AdminService } from './services/admin.service';
import { ManageCategoriesService } from './services/manage-categories.service';
import { ManageProductsService } from './services/manage-products.service';
import { ManageStoresService } from './services/manage-stores.service';
import { ManageSubCategoriesService } from './services/manage-subcategories.service';
import { ManageUsersService } from './services/manage-users.service';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import configuration from '../global/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('admin.jwtSecret'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CategoryModule,
    SubCategoryModule,
    StoreModule,
    ProductModule,
  ],
  controllers: [
    AdminController,
    ManageUsersController,
    ManageProductsController,
    ManageCategoriesController,
    ManageSubCategoriesController,
    ManageStoresController,
  ],
  providers: [
    AdminJwtStrategy,
    AdminService,
    ManageUsersService,
    ManageProductsService,
    ManageCategoriesService,
    ManageSubCategoriesService,
    ManageStoresService,
  ],
  exports: [
    ManageUsersService,
    ManageProductsService,
    ManageCategoriesService,
    ManageSubCategoriesService,
    ManageStoresService,
    AdminService,
    TypeOrmModule.forFeature([AdminEntity]),
  ],
})
export class AdminModule {}
