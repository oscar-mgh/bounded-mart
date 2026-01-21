import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../../../domain/entities/cart.entity';
import { CartRepositoryPort } from '../../../domain/ports/cart-repository.port';
import { CartMapper } from '../mappers/cart.mapper';
import { CartDocument } from '../schemas/cart.schema';

@Injectable()
export class MongooseCartRepository implements CartRepositoryPort {
  constructor(
    @InjectModel(CartDocument.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  async findByUserId(userId: string): Promise<Cart | null> {
    const doc = await this.cartModel.findOne({ userId }).exec();
    return doc ? CartMapper.toDomain(doc) : null;
  }

  async save(cart: Cart): Promise<Cart> {
    const persistence = CartMapper.toPersistence(cart);

    const doc = await this.cartModel
      .findOneAndUpdate(
        { userId: cart.getUserId() },
        { $set: persistence },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      )
      .exec();

    return CartMapper.toDomain(doc);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.cartModel.deleteOne({ userId }).exec();
  }
}
