import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { FindProductBySkuQuery } from './queries/find-product-by-sku.query';

@Injectable()
export class FindProductBySkuUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(command: FindProductBySkuQuery): Promise<Product> {
    const { sku } = command;
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }

    return product;
  }
}
