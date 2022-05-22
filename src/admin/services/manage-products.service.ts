import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { PhotosDto } from 'src/product/dto/photo.dto';
import { ProductDetailsDto } from 'src/product/dto/product-details.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectAwsService(S3)
    private readonly s3Service: S3,
    private readonly configService: ConfigService,
  ) {}

  async addProduct(
    photos: Array<PhotosDto>,
    productDetailsDto: ProductDetailsDto,
  ): Promise<ProductEntity> {
    const images = [];
    const keys = [];
    for (let i = 0; i < photos.length; i++) {
      const uploadedResult = await this.s3Service
        .upload({
          Bucket: `${this.configService.get('awsS3Bucket')}/products`,
          Body: photos[i].buffer,
          Key: `${Math.floor(Math.random() * 10000)}-${photos[i].originalname}`,
        })
        .promise();
      images.push(uploadedResult.Location);
      keys.push(uploadedResult.Key);
    }
    const newProduct = await this.productRepository.create();
    newProduct.categoryId = productDetailsDto.categoryId;
    newProduct.subCategoryId = productDetailsDto.subCategoryId;
    newProduct.storeId = productDetailsDto.storeId;
    newProduct.storeName = productDetailsDto.storeName;
    newProduct.photos = JSON.stringify(images);
    newProduct.keys = JSON.stringify(keys);
    newProduct.colors = JSON.stringify(productDetailsDto.colors);
    newProduct.vendorCode = productDetailsDto.vendorCode;
    newProduct.productName = productDetailsDto.productName;
    newProduct.gender = productDetailsDto.gender;
    newProduct.msisdn = productDetailsDto.msisdn;
    newProduct.telegram = productDetailsDto.telegram;
    newProduct.storeAddress = JSON.stringify(productDetailsDto.storeAddress);
    newProduct.deliveryCost = productDetailsDto.deliveryCost;
    newProduct.remainProducts = productDetailsDto.remainProducts;
    newProduct.price = productDetailsDto.price;
    newProduct.size = JSON.stringify(productDetailsDto.size);
    newProduct.material = productDetailsDto.material;
    newProduct.manufacturerCountry = productDetailsDto.manufacturerCountry;

    await this.productRepository.save(newProduct);
    return newProduct;
  }
}
