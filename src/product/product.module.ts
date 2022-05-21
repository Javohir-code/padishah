import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ConfigModule.forRoot(),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          credentials: {
            secretAccessKey: configService.get('awsSecret'),
            accessKeyId: configService.get('awsAccess'),
          },
        }),
        inject: [ConfigService],
      },
      services: [S3],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule.forFeature([ProductEntity]), ProductService],
})
export class ProductModule {}
