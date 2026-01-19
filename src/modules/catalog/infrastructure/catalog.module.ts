import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/modules/users/infrastructure/user.module";
import { CreateProductUseCase } from "../application/use-cases/create-product.use-case";
import { DeleteProductUseCase } from "../application/use-cases/delete-product.use-case";
import { FindAllProductsUseCase } from "../application/use-cases/find-all-products.use-case";
import { FindProductByIdUseCase } from "../application/use-cases/find-product-by-id.use-case";
import { UpdateStockUseCase } from "../application/use-cases/update-stock.use-case";
import { ProductRepositoryPort } from "../domain/ports/product-repository.port";
import { ProductController } from "./controllers/product.controller";
import { ProductDocument, ProductSchema } from "./persistance/entities/product.schema";
import { MongooseProductRepository } from "./persistance/repositories/mongoose-product.repository";
import { PRODUCT_REPOSITORY } from "./tokens";

const useCases = [
    {
        provide: CreateProductUseCase,
        inject: [PRODUCT_REPOSITORY],
        useFactory: (repo: ProductRepositoryPort) => new CreateProductUseCase(repo)
    },
    {
        provide: DeleteProductUseCase,
        inject: [PRODUCT_REPOSITORY],
        useFactory: (repo: ProductRepositoryPort) => new DeleteProductUseCase(repo)
    },
    {
        provide: UpdateStockUseCase,
        inject: [PRODUCT_REPOSITORY],
        useFactory: (repo: ProductRepositoryPort) => new UpdateStockUseCase(repo)
    },
    {
        provide: FindAllProductsUseCase,
        inject: [PRODUCT_REPOSITORY],
        useFactory: (repo: ProductRepositoryPort) => new FindAllProductsUseCase(repo)
    },
    {
        provide: FindProductByIdUseCase,
        inject: [PRODUCT_REPOSITORY],
        useFactory: (repo: ProductRepositoryPort) => new FindProductByIdUseCase(repo)
    }
];

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema }]),
        UserModule,
    ],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: MongooseProductRepository
        },
        ...useCases,
    ],
    controllers: [ProductController],
})
export class CatalogModule { }