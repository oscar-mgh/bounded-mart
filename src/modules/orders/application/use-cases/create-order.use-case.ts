import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Order } from '../../domain/entities/order.entity';
import { CatalogIntegrationPort } from '../../domain/ports/catalog-integration.port';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port';
import { OrderItem } from '../../domain/value-objects/order-item.vo';

export interface CreateOrderInput {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly catalogIntegration: CatalogIntegrationPort,
  ) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const productIds = input.items.map((item) => item.productId);
    const productsInfo = await this.catalogIntegration.getProductsInfo(productIds);
    const orderItems = input.items.map((item) => {
      const info = productsInfo.find((p) => p.productId === item.productId);

      if (!info) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      if (info.availableStock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product: ${info.name}`);
      }

      return new OrderItem(info.productId, info.name, info.price, item.quantity);
    });

    const order = new Order(Id.create(), input.customerId, orderItems);
    const savedOrder = await this.orderRepository.save(order);

    for (const item of input.items) {
      await this.catalogIntegration.updateStock(item.productId, item.quantity);
    }

    return savedOrder;
  }
}
