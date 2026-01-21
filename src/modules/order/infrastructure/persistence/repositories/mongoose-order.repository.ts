import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRepositoryPort } from '../../../domain/ports/order-repository.port';
import { Order } from '../../../domain/entities/order.entity';
import { OrderDocument } from '../schemas/order.schema';
import { OrderMapper } from '../mappers/order.mapper';

@Injectable()
export class MongooseOrderRepository implements OrderRepositoryPort {
  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async save(order: Order): Promise<Order> {
    const persistenceData = OrderMapper.toPersistence(order);

    const savedDoc = await this.orderModel
      .findByIdAndUpdate(persistenceData._id, persistenceData, { upsert: true, new: true })
      .exec();

    return OrderMapper.toDomain(savedDoc);
  }

  async findById(id: string): Promise<Order | null> {
    const doc = await this.orderModel.findById(id).exec();
    return doc ? OrderMapper.toDomain(doc) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const docs = await this.orderModel.find({ customerId }).exec();
    return docs.map((doc) => OrderMapper.toDomain(doc));
  }
}
