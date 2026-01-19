import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { OrderItem } from './order-item.entity';

enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export class Order {
  constructor(
    public readonly id: Id,
    public readonly customerId: string,
    private items: OrderItem[],
    private status: OrderStatus,
    private active: boolean = true,
    public readonly createdAt: Date,
  ) {
    if (items.length === 0)
      throw new Error('Order must have at least one item');
  }
  public getTotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }
}
