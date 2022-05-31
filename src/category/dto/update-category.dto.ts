import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  name: string;
}
