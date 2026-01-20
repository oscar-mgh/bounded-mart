import { Order } from '../entities/order.entity';

export abstract class OrderRepositoryPort {
  abstract save(order: Order): Promise<Order>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findByCustomerId(customerId: string): Promise<Order[]>;
}
