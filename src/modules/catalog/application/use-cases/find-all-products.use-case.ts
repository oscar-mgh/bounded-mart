import { Injectable } from "@nestjs/common";
import { Page } from "../../../shared/pagination/page.model";
import { Product } from "../../domain/entities/product.entity";
import { ProductRepositoryPort } from "../../domain/ports/product-repository.port";
import { PaginationQueryDto } from "../../infrastructure/http/dtos/pagination.dto";

@Injectable()
export class FindAllProductsUseCase {
    constructor(private readonly productRepository: ProductRepositoryPort) { }

    async execute(query: PaginationQueryDto): Promise<Page<Product>> {
        const { totalPages, totalElements, data, page } = await this.productRepository.findAll(query.page, query.limit);
        return {
            totalPages: Math.ceil(totalElements / query.limit),
            totalElements,
            data,
            page
        };
    }
}