import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
