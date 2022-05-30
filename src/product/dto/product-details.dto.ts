import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class ProductDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  subCategoryId: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  colors: Array<string>;

  @IsNumber()
  @IsNotEmpty()
  vendorCode: number;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productType: string;

  @IsString()
  @IsIn([Gender.male, Gender.female])
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  msisdn: string;

  @IsString()
  @IsNotEmpty()
  telegram: string;

  @IsArray()
  @IsNotEmpty()
  storeAddress: Array<string>;

  @IsNumber()
  @IsNotEmpty()
  deliveryCost: number;

  @IsNumber()
  @IsNotEmpty()
  remainProducts: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  salePrice: number;

  @IsArray()
  @IsNotEmpty()
  size: Array<number>;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsString()
  @IsNotEmpty()
  manufacturerCountry: string;

  @IsOptional()
  metadata: string;
}
