import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepositoryPort } from "../../domain/ports/product-repository.port";

@Injectable()
export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    async execute(id: string): Promise<void> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productRepository.delete(id);
    }
}