import { Injectable } from '@nestjs/common';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';
import { Cart } from '../../domain/entities/cart.entity';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  async execute(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      return new Cart(new Id(), userId, []);
    }

    return cart;
  }
}
