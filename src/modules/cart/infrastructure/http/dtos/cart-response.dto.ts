export class CartItemResponseDto {
  productId: string;
  quantity: number;
}

export class CartResponseDto {
  id: string;
  userId: string;
  items: CartItemResponseDto[];
  totalItems: number;
  updatedAt: Date;
}
