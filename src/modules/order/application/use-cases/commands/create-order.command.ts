export interface CreateOrderCommand {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
