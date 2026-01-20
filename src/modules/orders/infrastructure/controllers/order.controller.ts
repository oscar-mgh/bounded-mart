import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/modules/shared/infrastructure/pipes/validate-object-id.pipe';
import { GetUser } from 'src/modules/users/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/users/infrastructure/auth/guards/jwt-auth.guard';
import { CancelOrderUseCase } from '../../application/use-cases/cancel-order.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { GetCustomerOrdersUseCase } from '../../application/use-cases/get-customer-orders.use-case';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case';
import { CreateOrderDto } from '../http/create-order.dto';
import { OrderMapper } from '../persistence/mappers/order.mapper';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly getCustomerOrdersUseCase: GetCustomerOrdersUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateOrderDto, @GetUser('id') userId: string): Promise<any> {
    const order = await this.createOrderUseCase.execute({
      customerId: userId,
      items: dto.items,
    });
    return OrderMapper.toPersistence(order);
  }

  @Get('customer/:customerId')
  @UseGuards(JwtAuthGuard)
  async findCustomerOrders(@Param('customerId', ValidateObjectIdPipe) customerId: string): Promise<any> {
    const orders = await this.getCustomerOrdersUseCase.execute(customerId);
    return orders.map((order) => OrderMapper.toPersistence(order));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ValidateObjectIdPipe) id: string, @GetUser('id') userId: string): Promise<any> {
    const order = await this.getOrderUseCase.execute(id, userId);
    return OrderMapper.toPersistence(order);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@Param('id', ValidateObjectIdPipe) id: string, @GetUser('id') userId: string): Promise<void> {
    await this.cancelOrderUseCase.execute(id, userId);
  }
}
