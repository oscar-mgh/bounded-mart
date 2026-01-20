import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from 'src/modules/catalog/infrastructure/catalog.module';
import { CancelOrderUseCase } from '../application/use-cases/cancel-order.use-case';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { GetCustomerOrdersUseCase } from '../application/use-cases/get-customer-orders.use-case';
import { GetOrderUseCase } from '../application/use-cases/get-order.use-case';
import { CatalogIntegrationPort } from '../domain/ports/catalog-integration.port';
import { OrderRepositoryPort } from '../domain/ports/order-repository.port';
import { CatalogIntegrationAdapter } from './adapters/catalog-integration.adapter';
import { OrderController } from './controllers/order.controller';
import { MongooseOrderRepository } from './persistence/repositories/mongoose-order.repository';
import { OrderDocument, OrderSchema } from './persistence/schemas/order.schema';

const useCases = [
  {
    provide: CreateOrderUseCase,
    useFactory: (orderRepository: OrderRepositoryPort, catalogIntegration: CatalogIntegrationPort) =>
      new CreateOrderUseCase(orderRepository, catalogIntegration),
    inject: [OrderRepositoryPort, CatalogIntegrationPort],
  },
  {
    provide: GetCustomerOrdersUseCase,
    useFactory: (orderRepository: OrderRepositoryPort) => new GetCustomerOrdersUseCase(orderRepository),
    inject: [OrderRepositoryPort],
  },
  {
    provide: GetOrderUseCase,
    useFactory: (orderRepository: OrderRepositoryPort) => new GetOrderUseCase(orderRepository),
    inject: [OrderRepositoryPort],
  },
  {
    provide: CancelOrderUseCase,
    useFactory: (orderRepository: OrderRepositoryPort, catalogIntegration: CatalogIntegrationPort) =>
      new CancelOrderUseCase(orderRepository, catalogIntegration),
    inject: [OrderRepositoryPort, CatalogIntegrationPort],
  },
];

@Module({
  imports: [CatalogModule, MongooseModule.forFeature([{ name: OrderDocument.name, schema: OrderSchema }])],
  providers: [
    ...useCases,
    { provide: OrderRepositoryPort, useClass: MongooseOrderRepository },
    { provide: CatalogIntegrationPort, useClass: CatalogIntegrationAdapter },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
