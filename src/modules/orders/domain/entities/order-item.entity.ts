export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly quantity: number,
  ) {
    if (quantity <= 0) throw new Error('Quantity must be greater than zero');
    if (price < 0) throw new Error('Price cannot be negative');
  }

  get subtotal(): number {
    return this.price * this.quantity;
  }
}
