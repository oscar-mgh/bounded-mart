import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class AddressSchema {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;
}

@Schema({ timestamps: true, collection: 'stores' })
export class StoreDocument extends Document {
  @Prop({
    required: true,
    trim: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({ type: [String], required: true, index: true })
  adminIds: string[];

  @Prop({ type: AddressSchema, required: true })
  address: AddressSchema;

  @Prop({ default: true })
  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(StoreDocument);
