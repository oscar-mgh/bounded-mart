import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepositoryPort } from "../../domain/ports/product-repository.port";
import { Product } from "../../domain/entities/product.entity";

@Injectable()
export class UpdateStockUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    async execute(id: string, quantity: number): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        product.updateStock(quantity);

        return await this.productRepository.save(product);
    }
}