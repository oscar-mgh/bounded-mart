import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';

@Injectable()
export class GetCustomerOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }
}
