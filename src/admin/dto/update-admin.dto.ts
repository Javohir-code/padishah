import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
