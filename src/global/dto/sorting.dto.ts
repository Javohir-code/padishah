import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SortingParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  from?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  to?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  color?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  size?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;
}
