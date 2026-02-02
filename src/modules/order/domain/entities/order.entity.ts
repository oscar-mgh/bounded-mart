import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { OrderItem } from '../value-objects/order-item.vo';
import { OrderStatus } from '../enums/order-status.enum';

export class Order {
  constructor(
    public readonly id: Id,
    private readonly customerId: string,
    private items: OrderItem[],
    private status: OrderStatus = OrderStatus.PENDING,
    private active: boolean = true,
    private readonly createdAt: Date = new Date(),
  ) {
    if (this.items.length === 0) throw new Error('Order must contain at least one item');
  }

  public getTotalAmount(): number {
    return this.items.reduce((acc, item) => acc + item.getTotal(), 0);
  }

  public getCustomerId(): string {
    return this.customerId;
  }
  public getItems(): OrderItem[] {
    return this.items;
  }
  public getStatus(): OrderStatus {
    return this.status;
  }
  public isActive(): boolean {
    return this.active;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public markAsPaid(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be marked as paid');
    }
    this.status = OrderStatus.PAID;
  }

  public cancel(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be cancelled');
    }
    this.status = OrderStatus.CANCELLED;
    this.active = false;
  }
}
