import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OrderResponseDto } from 'src/modules/orders/infrastructure/http/dtos/order-response.dto';
import { OrderMapper } from 'src/modules/orders/infrastructure/persistence/mappers/order.mapper';
import { GetUser } from 'src/modules/users/infrastructure/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/modules/users/infrastructure/auth/guards/jwt-auth.guard';
import { AddToCartUseCase } from '../../application/use-cases/add-to-cart.use-case';
import { CheckoutUseCase } from '../../application/use-cases/checkout.use-case';
import { DeleteCartUseCase } from '../../application/use-cases/delete-cart.use-case';
import { FindCartByUserIdUseCase } from '../../application/use-cases/find-cart-by-user-id.use-case';
import { AddItemDto } from '../http/dtos/add-item.dto';
import { CartResponseDto } from '../http/dtos/cart-response.dto';
import { CartMapper } from '../persistence/mappers/cart.mapper';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly addToCartUseCase: AddToCartUseCase,
    private readonly deleteCartUseCase: DeleteCartUseCase,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly checkoutUseCase: CheckoutUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCart(@GetUser('id') userId: string): Promise<CartResponseDto> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);
    return CartMapper.toResponse(cart);
  }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  async addItem(@GetUser('id') userId: string, @Body() dto: AddItemDto): Promise<CartResponseDto> {
    const cart = await this.addToCartUseCase.execute(userId, dto.productId, dto.quantity);
    return CartMapper.toResponse(cart);
  }

  @Post('checkout')
  @HttpCode(HttpStatus.CREATED)
  async checkout(@GetUser('id') userId: string): Promise<OrderResponseDto> {
    const order = await this.checkoutUseCase.execute(userId);
    return OrderMapper.toResponse(order);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCart(@GetUser('id') userId: string): Promise<void> {
    await this.deleteCartUseCase.execute(userId);
  }
}
