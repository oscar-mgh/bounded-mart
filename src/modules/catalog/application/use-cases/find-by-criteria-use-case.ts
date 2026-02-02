import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { FindByCriteriaQuery } from './queries/find-by-criteria.query';

@Injectable()
export class FindByCriteriaUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(query: FindByCriteriaQuery): Promise<Product[]> {
    return await this.productRepository.findByCriteria(query);
  }
}
