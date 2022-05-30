import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDetailsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
