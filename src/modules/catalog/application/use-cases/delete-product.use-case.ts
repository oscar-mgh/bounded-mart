import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { DeleteProductCommand } from './commands/delete-product.command';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(command: DeleteProductCommand, storeId: string): Promise<void> {
    const { id } = command;
    const product = await this.productRepository.findById(id, storeId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    product.deactivate();
    await this.productRepository.delete(id);
  }
}
