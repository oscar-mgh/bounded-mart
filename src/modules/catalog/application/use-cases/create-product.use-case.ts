import { Injectable } from '@nestjs/common';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';
import { Sku } from '../../domain/value-objects/sku.vo';
import { CreateProductDto } from '../../infrastructure/http/create-product.dto';

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    async execute(dto: CreateProductDto): Promise<Product> {
        const product = new Product(
            Id.create(),
            new Sku(dto.sku),
            dto.name,
            dto.description,
            dto.price,
            dto.stock
        );

        return this.productRepository.save(product);
    }
}