import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { OrderItem } from '../value-objects/order-item.vo';
import { OrderStatus } from '../enums/order-status.enum';

export class Order {
  constructor(
    public readonly id: Id,
    private readonly customerId: string,
    private readonly items: OrderItem[],
    private status: OrderStatus = OrderStatus.PENDING,
    private readonly createdAt: Date = new Date(),
  ) {
    if (items.length === 0) throw new Error('Order must contain at least one item');
  }

  get totalAmount(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  public markAsPaid(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be marked as paid');
    }
    this.status = OrderStatus.PAID;
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
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public cancel(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be cancelled');
    }
    this.status = OrderStatus.CANCELLED;
  }
}
