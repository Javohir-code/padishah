import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
