import { Product } from "src/modules/catalog/domain/entities/product.entity";
import { Sku } from "src/modules/catalog/domain/value-objects/sku.vo";
import { ProductDocument } from "src/modules/catalog/infrastructure/persistance/entities/product.schema";
import { Id } from "src/modules/shared/domain/value-objects/id.vo";
import { ProductResponseDto } from "../../http/product-response.dto";

export class ProductMapper {
    static toDomain(raw: ProductDocument): Product {
        return new Product(
            new Id(raw._id.toString()),
            new Sku(raw.sku),
            raw.name,
            raw.description,
            raw.price,
            raw.stock,
            raw.active
        );
    }

    static toPersistence(domain: any): any {
        return {
            _id: domain.id.toString(),
            sku: domain.getSku().getValue(),
            name: domain.getName(),
            description: domain.getDescription(),
            price: domain.getPrice(),
            stock: domain.getStock(),
            active: domain.isActive()
        };
    }

    static toResponse(product: Product): ProductResponseDto {
        return {
            id: product.id.toString(),
            name: product.getName(),
            description: product.getDescription(),
            sku: product.getSku().getValue(),
            price: product.getPrice(),
            stock: product.getStock(),
        };
    }
}