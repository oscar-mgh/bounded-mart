import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/modules/shared/pagination/page.model';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../../domain/ports/product-repository.port';
import { ProductDocument } from '../entities/product.schema';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class MongooseProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectModel(ProductDocument.name)
        private readonly productModel: Model<ProductDocument>,
    ) { }

    async updateStock(id: string, quantity: number): Promise<Product> {
        const updatedDoc = await this.productModel.findByIdAndUpdate(
            id,
            { stock: quantity },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedDoc) {
            throw new Error(`Product with ID ${id} not found`);
        }

        return ProductMapper.toDomain(updatedDoc);
    }

    async findAll(page: number, limit: number): Promise<Page<Product>> {
        const skip = (page - 1) * limit;

        const filter = { active: true };

        const [docs, totalElements] = await Promise.all([
            this.productModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .exec(),
            this.productModel.countDocuments(filter).exec(),
        ]);

        return {
            totalPages: Math.ceil(totalElements / limit),
            data: docs.map((doc) => ProductMapper.toDomain(doc)),
            totalElements,
            page,
        };
    }

    async save(product: Product): Promise<Product> {
        try {
            const persistenceData = ProductMapper.toPersistence(product);
            persistenceData.sku = uuidv4();
            const doc = await this.productModel.findByIdAndUpdate(
                persistenceData._id,
                persistenceData,
                { upsert: true, new: true },
            ).exec();
            return ProductMapper.toDomain(doc);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Product with this SKU already exists');
            }
            throw error;
        }
    }

    async findBySku(sku: string): Promise<Product | null> {
        const doc = await this.productModel.findOne({ sku, active: true }).exec();
        if (!doc) return null;
        return ProductMapper.toDomain(doc);
    }

    async findById(id: string): Promise<Product | null> {
        const doc = await this.productModel.findOne({ _id: id, active: true }).exec();
        if (!doc) return null;
        return ProductMapper.toDomain(doc);
    }


    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndUpdate(id, { active: false }).exec();
    }
}