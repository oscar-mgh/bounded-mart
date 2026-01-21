import { Injectable } from '@nestjs/common';
import { ProductCriteria, ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { ProductDiscount } from '../../domain/value-objects/product-discount.vo';

@Injectable()
export class ApplyDiscountUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(
    criteria: ProductCriteria,
    discountData: { code: string; percentage: number; expirationDate: Date },
  ): Promise<number> {
    const products = await this.productRepository.findByCriteria(criteria);

    if (products.length === 0) return 0;

    products.forEach((product) => {
      const newDiscount = new ProductDiscount(discountData.code, discountData.percentage, discountData.expirationDate);

      product.applyDiscount(newDiscount);
    });

    await this.productRepository.saveMany(products);
    return products.length;
  }
}
