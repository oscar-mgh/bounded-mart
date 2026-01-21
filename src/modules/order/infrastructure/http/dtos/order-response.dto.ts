export class OrderItemResponseDto {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export class OrderResponseDto {
  id: string;
  customerId: string;
  items: OrderItemResponseDto[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}
