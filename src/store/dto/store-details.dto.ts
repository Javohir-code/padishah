import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StoreDetailsDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  msisdn: string;

  @IsString()
  @IsNotEmpty()
  telegram: string;

  @IsArray()
  @IsNotEmpty()
  addresses: Array<string>;
}
