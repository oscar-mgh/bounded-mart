import { Sku } from 'src/modules/catalog/domain/value-objects/sku.vo';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';

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

  public getSku(): Sku { return this.sku; }
  public getName(): string { return this.name; }
  public getDescription(): string { return this.description; }
  public getPrice(): number { return this.price; }
  public getStock(): number { return this.stock; }
  public isActive(): boolean { return this.active; }

  private validate() {
    if (this.name.length < 2 || this.name.length > 50)
      throw new Error('Invalid name length');
    if (this.price <= 0) throw new Error('Price must be positive');
    if (this.stock < 0) throw new Error('Stock cannot be negative');
  }

  public deactivate(): void {
    this.active = false;
  }

  public updateStock(newQuantity: number) {
    if (newQuantity < 0) throw new Error('Stock cannot be negative');
    this.stock = newQuantity;
  }
}
