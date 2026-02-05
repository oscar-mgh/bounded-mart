import { Injectable } from '@nestjs/common';
import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { DeleteProductCommand } from './commands/delete-product.command';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort,
    private readonly finderService: EntityFinderService,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const product = await this.finderService.findOrThrow(this.productRepository, command.id, 'Product');
    product.deactivate();
    await this.productRepository.delete(command.id);
  }
}
