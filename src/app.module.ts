import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './global/config/config';
import { UserEntity } from './user/entities/user.entity';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entities/category.entity';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { SubCategoryEntity } from './subcategory/entities/subcategory.entity';
import { LoginEntity } from './user/entities/login.entity';
import { AdminEntity } from './admin/entities/admin.entity';

const entities = [
  UserEntity,
  CategoryEntity,
  SubCategoryEntity,
  LoginEntity,
  AdminEntity,
];

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: entities,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AdminModule,
    ProductModule,
    StoreModule,
    CategoryModule,
    SubCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
