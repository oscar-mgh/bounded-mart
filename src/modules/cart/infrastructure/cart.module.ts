import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from 'src/modules/catalog/infrastructure/catalog.module';
import { CreateOrderUseCase } from 'src/modules/orders/application/use-cases/create-order.use-case';
import { CatalogIntegrationPort } from 'src/modules/orders/domain/ports/catalog-integration.port';
import { OrderModule } from 'src/modules/orders/infrastructure/order.module';
import { AddToCartUseCase } from '../application/use-cases/add-to-cart.use-case';
import { CheckoutUseCase } from '../application/use-cases/checkout.use-case';
import { DeleteCartUseCase } from '../application/use-cases/delete-cart.use-case';
import { FindCartByUserIdUseCase } from '../application/use-cases/find-cart-by-user-id.use-case';
import { CartRepositoryPort } from '../domain/ports/cart-repository.port';
import { CartController } from './controllers/cart.controller';
import { MongooseCartRepository } from './persistence/repositories/mongoose-cart.repository';
import { CartDocument, CartSchema } from './persistence/schemas/cart.schema';

const useCases = [
  {
    provide: AddToCartUseCase,
    inject: [CartRepositoryPort, CatalogIntegrationPort],
    useFactory: (repo: CartRepositoryPort, catalog: CatalogIntegrationPort) => new AddToCartUseCase(repo, catalog),
  },
  {
    provide: FindCartByUserIdUseCase,
    inject: [CartRepositoryPort],
    useFactory: (repo: CartRepositoryPort) => new FindCartByUserIdUseCase(repo),
  },
  {
    provide: DeleteCartUseCase,
    inject: [CartRepositoryPort],
    useFactory: (repo: CartRepositoryPort) => new DeleteCartUseCase(repo),
  },
  {
    provide: CheckoutUseCase,
    inject: [CartRepositoryPort, CreateOrderUseCase],
    useFactory: (repo: CartRepositoryPort, create: CreateOrderUseCase) => new CheckoutUseCase(repo, create),
  },
];

@Module({
  imports: [
    CatalogModule,
    OrderModule,
    MongooseModule.forFeature([
      {
        name: CartDocument.name,
        schema: CartSchema,
      },
    ]),
  ],
  providers: [
    ...useCases,
    {
      provide: CartRepositoryPort,
      useClass: MongooseCartRepository,
    },
  ],
  controllers: [CartController],
  exports: [CartRepositoryPort],
})
export class CartModule {}
