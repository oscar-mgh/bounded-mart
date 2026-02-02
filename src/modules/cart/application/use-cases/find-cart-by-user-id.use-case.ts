import { Injectable } from '@nestjs/common';
import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { Cart } from '../../domain/entities/cart.entity';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';
import { FindCartByUserIdQuery } from './queries/find-cart-by-user-id.query';

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(
    private readonly cartRepository: CartRepositoryPort,
    private readonly finderService: EntityFinderService,
  ) {}

  async execute(command: FindCartByUserIdQuery): Promise<Cart> {
    return await this.finderService.findByUserOrThrow(this.cartRepository, command.userId, 'Cart');
  }
}
