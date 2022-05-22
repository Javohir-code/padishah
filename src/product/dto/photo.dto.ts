import { IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PhotosDto {
  @IsString()
  readonly fieldname: string;

  @IsString()
  readonly originalname: string;

  @IsString()
  readonly encoding: string;

  @IsString()
  readonly mimetype: string;

  @Type(() => Buffer)
  readonly buffer: Buffer;

  @IsNumber()
  @Max(5242880)
  readonly size: number;

  @IsOptional()
  readonly path: string;
}
