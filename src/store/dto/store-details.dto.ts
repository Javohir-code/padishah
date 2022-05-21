import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  addresses: string;
}
