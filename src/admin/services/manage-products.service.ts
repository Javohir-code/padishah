import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { PhotosDto } from 'src/product/dto/photo.dto';
import { ProductDetailsDto } from 'src/product/dto/product-details.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/services/product.service';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

@Injectable()
export class ManageProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectAwsService(S3)
    private readonly s3Service: S3,
    private readonly configService: ConfigService,
    private productService: ProductService,
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
    newProduct.brandId = productDetailsDto.brandId;
    newProduct.description = productDetailsDto.description;
    newProduct.photos = JSON.stringify(images);
    newProduct.keys = JSON.stringify(keys);
    newProduct.colors = JSON.stringify(productDetailsDto.colors);
    newProduct.vendorCode = productDetailsDto.vendorCode;
    newProduct.productName = productDetailsDto.productName;
    newProduct.productType = productDetailsDto.productType;
    newProduct.gender = productDetailsDto.gender;
    newProduct.msisdn = productDetailsDto.msisdn;
    newProduct.telegram = productDetailsDto.telegram;
    newProduct.storeAddress = JSON.stringify(productDetailsDto.storeAddress);
    newProduct.deliveryCost = productDetailsDto.deliveryCost;
    newProduct.remainProducts = productDetailsDto.remainProducts;
    newProduct.price = productDetailsDto.price;
    newProduct.salePrice = productDetailsDto?.salePrice;
    newProduct.salePercent = productDetailsDto?.salePercent;
    newProduct.size = JSON.stringify(productDetailsDto.size);
    newProduct.material = productDetailsDto.material;
    newProduct.manufacturerCountry = productDetailsDto.manufacturerCountry;

    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this.productService.getProductById(productId);
    await this.productRepository.delete(product.productId);
  }

  async deleteProductPhoto(
    productId: number,
    productUrl: string,
  ): Promise<void> {
    const newObjPhoto = {};
    const newObjKey = {};
    const product = await this.productService.getProductById(productId);
    product.photos = JSON.parse(product.photos);
    product.keys = JSON.parse(product.keys);
    const photos = Object.keys(product.photos).filter(
      (photo) => product.photos[photo] !== productUrl,
    );
    const keys = Object.keys(product.keys).filter(
      (key) => product.keys[key] !== productUrl.substring(34),
    );
    photos.forEach((photo) => (newObjPhoto[photo] = product.photos[photo]));
    keys.forEach((key) => (newObjKey[key] = product.keys[key]));
    await this.productRepository.save({
      ...product,
      photos: JSON.stringify(Object.values(newObjPhoto)),
      keys: JSON.stringify(Object.values(newObjKey)),
    });
    await this.s3Service
      .deleteObject({
        Bucket: `${this.configService.get('awsS3Bucket')}/products`,
        Key: productUrl.substring(43),
      })
      .promise();
  }

  async updateProduct(
    photos?: Array<PhotosDto>,
    updateProduct?: UpdateProductDto,
  ): Promise<ProductEntity> {
    const images = [];
    const keys = [];
    const product = await this.productService.getProductById(
      updateProduct.productId,
    );
    if (photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        const uploadedResult = await this.s3Service
          .upload({
            Bucket: `${this.configService.get('awsS3Bucket')}/products`,
            Body: photos[i].buffer,
            Key: `${Math.floor(Math.random() * 10000)}-${
              photos[i].originalname
            }`,
          })
          .promise();
        images.push(uploadedResult.Location);
        keys.push(uploadedResult.Key);
      }
    }
    product.categoryId = updateProduct.categoryId
      ? updateProduct.categoryId
      : product.categoryId;
    product.subCategoryId = updateProduct.subCategoryId
      ? updateProduct.subCategoryId
      : product.subCategoryId;
    product.storeId = updateProduct.storeId
      ? updateProduct.storeId
      : product.storeId;
    product.brandId = updateProduct.brandId
      ? updateProduct.brandId
      : product.brandId;
    product.description = updateProduct.description
      ? updateProduct.description
      : product.description;
    product.photos = JSON.stringify(JSON.parse(product.photos).concat(images));
    product.keys = JSON.stringify(JSON.parse(product.keys).concat(keys));
    product.colors = JSON.stringify(updateProduct.colors)
      ? JSON.stringify(updateProduct.colors)
      : product.colors;
    product.vendorCode = updateProduct.vendorCode
      ? updateProduct.vendorCode
      : product.vendorCode;
    product.productName = updateProduct.productName
      ? updateProduct.productName
      : product.productName;
    product.productType = updateProduct.productType
      ? updateProduct.productType
      : product.productType;
    product.gender = updateProduct.gender
      ? updateProduct.gender
      : product.gender;
    product.msisdn = updateProduct.msisdn
      ? updateProduct.msisdn
      : product.msisdn;
    product.telegram = updateProduct.telegram
      ? updateProduct.telegram
      : product.telegram;
    product.storeAddress = JSON.stringify(updateProduct.storeAddress)
      ? JSON.stringify(updateProduct.storeAddress)
      : product.storeAddress;
    product.deliveryCost = updateProduct.deliveryCost
      ? updateProduct.deliveryCost
      : product.deliveryCost;
    product.remainProducts = updateProduct.remainProducts
      ? updateProduct.remainProducts
      : product.remainProducts;
    product.price = updateProduct.price ? updateProduct.price : product.price;
    product.salePrice = updateProduct.salePrice
      ? updateProduct.salePrice
      : product.salePrice;
    product.salePercent = updateProduct.salePercent
      ? updateProduct.salePercent
      : product.salePercent;
    product.size = JSON.stringify(updateProduct.size)
      ? JSON.stringify(updateProduct.size)
      : product.size;
    product.material = updateProduct.material
      ? updateProduct.material
      : product.material;
    product.manufacturerCountry = updateProduct.manufacturerCountry
      ? updateProduct.manufacturerCountry
      : product.manufacturerCountry;
    product.metadata = JSON.stringify(updateProduct.metadata)
      ? JSON.stringify(updateProduct.metadata)
      : product.metadata;

    await this.productRepository.save({
      ...product,
      updateProduct,
      photos: product.photos,
      keys: product.keys,
    });

    return product;
  }
}
