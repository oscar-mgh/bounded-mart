import { Product } from 'src/modules/catalog/domain/entities/product.entity';
import { ProductDiscount } from 'src/modules/catalog/domain/value-objects/product-discount.vo';
import { Sku } from 'src/modules/catalog/domain/value-objects/sku.vo';
import { ProductDocument } from 'src/modules/catalog/infrastructure/persistence/entities/product.schema';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { ProductResponseDto } from '../../http/dtos/product-response.dto';
import { ProductPersistenceDto } from '../dtos/product-persistence.dto';

export class ProductMapper {
  static toDomain(raw: ProductDocument): Product {
    const discount = raw.discount
      ? new ProductDiscount(raw.discount.code, raw.discount.percentage, raw.discount.expirationDate)
      : undefined;

    return new Product(
      new Id(raw._id.toString()),
      new Sku(raw.sku),
      raw.name,
      raw.description,
      raw.price,
      raw.stock,
      raw.category,
      raw.active,
      discount,
    );
  }

  static toPersistence(domain: Product): ProductPersistenceDto {
    const discount = domain.getDiscount();

    return {
      _id: domain.id.getValue(),
      sku: domain.getSku().getValue(),
      name: domain.getName(),
      description: domain.getDescription(),
      price: domain.getPrice(),
      stock: domain.getStock(),
      active: domain.isActive(),
      category: domain.getCategory(),
      discount: discount
        ? {
            code: discount.getCode(),
            percentage: discount.getPercentage(),
            expirationDate: discount.getExpirationDate(),
          }
        : null,
    };
  }

  static toResponse(product: Product): ProductResponseDto {
    const discount = product.getDiscount();
    const finalPrice = product.getFinalPrice();

    return {
      id: product.id.getValue(),
      name: product.getName(),
      description: product.getDescription(),
      sku: product.getSku().getValue(),
      price: product.getPrice(),
      finalPrice: finalPrice || product.getPrice(),
      stock: product.getStock(),
      category: product.getCategory(),
      discount:
        discount && !discount.isExpired()
          ? {
              code: discount.getCode(),
              percentage: discount.getPercentage(),
              expiresAt: discount.getExpirationDate(),
            }
          : undefined,
    };
  }
}
