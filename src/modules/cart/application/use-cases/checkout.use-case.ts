import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from 'src/modules/order/application/use-cases/create-order.use-case';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';
import { CheckoutCommand } from './commands/checkout.command';

@Injectable()
export class CheckoutUseCase {
  constructor(
    private readonly cartRepository: CartRepositoryPort,
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  async execute(command: CheckoutCommand): Promise<Order> {
    const cart = await this.cartRepository.findByUserId(command.userId);
    if (!cart || cart.getItems().length === 0) {
      throw new BadRequestException('Cannot checkout an empty cart');
    }

    const orderItemsDto = cart.getItems().map((item) => ({
      productId: item.getProductId(),
      quantity: item.getQuantity(),
    }));

    const order = await this.createOrderUseCase.execute({
      customerId: cart.getUserId(),
      items: orderItemsDto,
    });

    await this.cartRepository.deleteByUserId(command.userId);

    return order;
  }
}
