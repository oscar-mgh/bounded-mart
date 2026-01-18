import { Sku } from 'src/modules/catalog/domain/value-objects/sku.vo';
import { Id } from 'src/shared/domain/value-objects/id.vo';

export class Product {
  constructor(
    public readonly id: Id,
    private sku: Sku,
    private name: string,
    private description: string,
    private price: number,
    private stock: number,
    private active: boolean = true,
  ) {
    this.validate();
  }

  private validate() {
    if (this.name.length < 2 || this.name.length > 100)
      throw new Error('Invalid name length');
    if (this.price <= 0) throw new Error('Price must be positive');
    if (this.stock < 0) throw new Error('Stock cannot be negative');
    if (!/^PROD-\d+$/.test(this.sku.val)) throw new Error('Invalid SKU format');
  }

  public updateStock(newQuantity: number) {
    if (newQuantity < 0) throw new Error('Stock cannot be negative');
    this.stock = newQuantity;
  }

  public updateSku(newSku: string): void {
    this.sku = new Sku(newSku);
  }
}
