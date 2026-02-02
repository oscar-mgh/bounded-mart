import { Injectable } from '@nestjs/common';
import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port';
import { DeleteCartCommand } from './commands/delete-cart.command';

@Injectable()
export class DeleteCartUseCase {
  constructor(
    private readonly cartRepository: CartRepositoryPort,
    private readonly finderService: EntityFinderService,
  ) {}

  async execute(command: DeleteCartCommand): Promise<void> {
    await this.finderService.findByUserOrThrow(this.cartRepository, command.userId, 'Cart');
    await this.cartRepository.deleteByUserId(command.userId);
  }
}
