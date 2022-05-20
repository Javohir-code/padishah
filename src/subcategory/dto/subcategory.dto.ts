import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
