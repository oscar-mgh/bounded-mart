import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../../../domain/enums/order-status.enum';

@Schema()
class OrderItemSchema {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true, collection: 'orders' })
export class OrderDocument extends Document {
  @Prop({ required: true })
  customerId: string;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItemSchema[];

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
