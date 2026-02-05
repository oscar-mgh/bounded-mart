import { Injectable } from '@nestjs/common';
import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { FindProductByIdQuery } from './queries/find-product-by-id.query';

@Injectable()
export class FindProductByIdUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort,
    private readonly finderService: EntityFinderService,
  ) {}

  async execute(query: FindProductByIdQuery): Promise<Product> {
    return this.finderService.findOrThrow(this.productRepository, query.id, 'Product');
  }
}
