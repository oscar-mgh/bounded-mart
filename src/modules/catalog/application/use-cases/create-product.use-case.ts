import { Injectable } from '@nestjs/common';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { ProductDiscount } from '../../domain/value-objects/product-discount.vo';
import { Sku } from '../../domain/value-objects/sku.vo';

interface CreateProductDto {
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  discount?: {
    code: string;
    percentage: number;
    expirationDate: Date;
  };
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const discount = dto.discount
      ? new ProductDiscount(dto.discount.code, dto.discount.percentage, dto.discount.expirationDate)
      : undefined;

    const product = new Product(
      Id.create(),
      new Sku(dto.sku),
      dto.name,
      dto.description,
      dto.price,
      dto.stock,
      dto.category,
      true,
      discount,
    );

    return this.productRepository.save(product);
  }
}
