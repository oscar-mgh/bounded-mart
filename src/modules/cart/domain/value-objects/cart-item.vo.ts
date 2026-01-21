export class CartItem {
  constructor(
    private readonly productId: string,
    private readonly quantity: number,
  ) {
    if (quantity <= 0) throw new Error('Quantity must be at least 1');
  }

  public getProductId(): string { return this.productId; }
  public getQuantity(): number { return this.quantity; }

  public withQuantity(newQuantity: number): CartItem {
    return new CartItem(this.productId, newQuantity);
  }
}