import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { GetCustomerOrdersQuery } from './queries/get-customer-orders.query';

@Injectable()
export class GetCustomerOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(query: GetCustomerOrdersQuery): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(query.customerId);
  }
}
