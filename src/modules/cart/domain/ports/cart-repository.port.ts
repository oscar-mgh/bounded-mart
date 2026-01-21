import { Cart } from '../entities/cart.entity';

export abstract class CartRepositoryPort {
	
  abstract findByUserId(userId: string): Promise<Cart | null>;

  abstract save(cart: Cart): Promise<Cart>;

  abstract deleteByUserId(userId: string): Promise<void>;
}
