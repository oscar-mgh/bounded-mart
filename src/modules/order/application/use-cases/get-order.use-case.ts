import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(id: string, userId: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (order.getCustomerId() !== userId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }
}
