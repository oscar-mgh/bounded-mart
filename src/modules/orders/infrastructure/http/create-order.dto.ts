import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNumber, Min, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
