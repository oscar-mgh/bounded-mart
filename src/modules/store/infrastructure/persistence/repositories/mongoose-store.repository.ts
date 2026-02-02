import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from 'src/modules/store/domain/entities/store.entity';
import { StoreRepositoryPort } from 'src/modules/store/domain/ports/store-repository.port';
import { StoreDocument } from 'src/modules/store/infrastructure/persistence/entities/store.schema';
import { StoreMapper } from 'src/modules/store/infrastructure/persistence/mappers/store.mapper';

@Injectable()
export class MongooseStoreRepository implements StoreRepositoryPort {
  constructor(
    @InjectModel(StoreDocument.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async save(store: Store): Promise<Store> {
    const persistence = StoreMapper.toPersistence(store);

    const updatedDocument = await this.storeModel.findByIdAndUpdate(persistence._id, persistence, {
      upsert: true,
      new: true,
    });

    return StoreMapper.toDomain(updatedDocument);
  }

  async findById(id: string): Promise<Store | null> {
    const doc = await this.storeModel.findById(id).exec();
    return doc ? StoreMapper.toDomain(doc) : null;
  }

  async findByAdminId(adminId: string): Promise<Store[]> {
    const docs = await this.storeModel.find({ adminIds: adminId }).exec();
    return docs.map((doc: StoreDocument) => StoreMapper.toDomain(doc));
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.storeModel.countDocuments({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    });
    return count > 0;
  }

  async delete(id: string): Promise<void> {
    await this.storeModel.findByIdAndUpdate({ _id: id, active: true }, { active: false }).exec();
  }
}
