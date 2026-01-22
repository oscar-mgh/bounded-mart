import { Injectable } from '@nestjs/common';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Cart } from '../../domain/entities/cart.entity';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';
import { FindCartByUserIdQuery } from './queries/find-cart-by-user-id.query';

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  async execute(command: FindCartByUserIdQuery): Promise<Cart> {
    const { userId } = command;
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      return new Cart(new Id(), userId, []);
    }

    return cart;
  }
}
