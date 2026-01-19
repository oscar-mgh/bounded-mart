import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'products', timestamps: true })
export class ProductDocument extends Document {
    @Prop({ unique: true, required: true }) sku: string;
    @Prop({ required: true }) name: string;
    @Prop() description: string;
    @Prop({ required: true }) price: number;
    @Prop({ required: true }) stock: number;
    @Prop({ default: true }) active: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(ProductDocument);