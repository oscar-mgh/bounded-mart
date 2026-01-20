export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly unitPrice: number,
    public readonly quantity: number,
  ) {
    this.validate();
  }

  private validate() {
    if (this.quantity <= 0) throw new Error('Quantity must be at least 1');
    if (this.unitPrice < 0) throw new Error('Price cannot be negative');
  }

  public getTotal(): number {
    return this.unitPrice * this.quantity;
  }

  public getProductId(): string {
    return this.productId;
  }
  public getProductName(): string {
    return this.productName;
  }
  public getUnitPrice(): number {
    return this.unitPrice;
  }
  public getQuantity(): number {
    return this.quantity;
  }
}
