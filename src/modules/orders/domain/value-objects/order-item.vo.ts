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

  get total(): number {
    return this.unitPrice * this.quantity;
  }
}
