import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { UpdateStockCommand } from './commands/update-stock.command';

@Injectable()
export class UpdateStockUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(command: UpdateStockCommand): Promise<Product> {
    const { id, quantity } = command;
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    product.updateStock(quantity);

    return await this.productRepository.save(product);
  }
}
