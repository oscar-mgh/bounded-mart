import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';

@Injectable()
export class FindProductBySkuUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(sku: string): Promise<Product> {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new NotFoundException(`Product with SKU ${sku} not found`);
    }

    return product;
  }
}
