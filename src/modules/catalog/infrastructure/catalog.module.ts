import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/users/infrastructure/user.module';
import { ApplyDiscountUseCase } from '../application/use-cases/apply-discount.use-case';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../application/use-cases/delete-product.use-case';
import { FindAllProductsUseCase } from '../application/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from '../application/use-cases/find-product-by-id.use-case';
import { FindProductBySkuUseCase } from '../application/use-cases/find-product-by-sku.use-case';
import { UpdateStockUseCase } from '../application/use-cases/update-stock.use-case';
import { ProductRepositoryPort } from '../domain/ports/product-repository.port';
import { ProductController } from './controllers/product.controller';
import { ProductDocument, ProductSchema } from './persistence/entities/product.schema';
import { MongooseProductRepository } from './persistence/repositories/mongoose-product.repository';

const useCases = [
  {
    provide: CreateProductUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new CreateProductUseCase(repo),
  },
  {
    provide: DeleteProductUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new DeleteProductUseCase(repo),
  },
  {
    provide: UpdateStockUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new UpdateStockUseCase(repo),
  },
  {
    provide: FindAllProductsUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new FindAllProductsUseCase(repo),
  },
  {
    provide: FindProductByIdUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new FindProductByIdUseCase(repo),
  },
  {
    provide: FindProductBySkuUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new FindProductBySkuUseCase(repo),
  },
  {
    provide: ApplyDiscountUseCase,
    inject: [ProductRepositoryPort],
    useFactory: (repo: ProductRepositoryPort) => new ApplyDiscountUseCase(repo),
  },
];

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema }]), UserModule],
  providers: [
    {
      provide: ProductRepositoryPort,
      useClass: MongooseProductRepository,
    },
    ...useCases,
  ],
  controllers: [ProductController],
  exports: [ProductRepositoryPort],
})
export class CatalogModule {}
