import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  subCategoryId: number;

  @IsNumber()
  @IsOptional()
  storeId: number;

  @IsNumber()
  @IsOptional()
  brandId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  colors: Array<string>;

  @IsNumber()
  @IsOptional()
  vendorCode: number;

  @IsString()
  @IsOptional()
  productName: string;

  @IsString()
  @IsOptional()
  productType: string;

  @IsString()
  @IsIn([Gender.male, Gender.female])
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  msisdn: string;

  @IsString()
  @IsOptional()
  telegram: string;

  @IsArray()
  @IsOptional()
  storeAddress: Array<string>;

  @IsNumber()
  @IsOptional()
  deliveryCost: number;

  @IsNumber()
  @IsOptional()
  remainProducts: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  salePrice: number;

  @IsArray()
  @IsOptional()
  size: Array<number>;

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  manufacturerCountry: string;

  @IsOptional()
  metadata: string;
}
