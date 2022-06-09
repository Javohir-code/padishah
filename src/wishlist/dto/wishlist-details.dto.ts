import { IsNotEmpty, IsNumber } from 'class-validator';

export class WishlistDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
