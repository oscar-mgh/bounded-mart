import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { GetOrderQuery } from './queries/get-order.query';

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(query: GetOrderQuery): Promise<Order> {
    const { orderId, userId } = query;
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    if (order.getCustomerId() !== userId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }
}
