export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly quantity: number,
  ) {
    if (this.quantity <= 0) throw new Error('Quantity must be greater than zero');
    if (this.price < 0) throw new Error('Price cannot be negative');
  }

  public getProductId(): string {
    return this.productId;
  }
  public getName(): string {
    return this.name;
  }
  public getPrice(): number {
    return this.price;
  }
  public getQuantity(): number {
    return this.quantity;
  }

  public getSubtotal(): number {
    return this.price * this.quantity;
  }
}
