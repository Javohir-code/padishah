import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
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
})
export class ProductModule {}
