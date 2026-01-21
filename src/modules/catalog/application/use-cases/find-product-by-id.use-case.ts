import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../../domain/entities/product.entity";
import { ProductRepositoryPort } from "../../domain/ports/product-repository.port";

@Injectable()
export class FindProductByIdUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    async execute(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }
}