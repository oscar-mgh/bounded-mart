import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';

@Injectable()
export class DeleteCartUseCase {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  async execute(userId: string): Promise<void> {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException(`Cart for user ${userId} not found`);
    }

    await this.cartRepository.deleteByUserId(userId);
  }
}
