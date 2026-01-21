import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../../domain/ports/user-repository.port';
import { UserDocument } from '../entities/user.schema';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class MongooseUserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async save(user: User): Promise<void> {
    const persistenceData = UserMapper.toPersistence(user);

    await this.userModel.findByIdAndUpdate(
      persistenceData._id,
      persistenceData,
      { upsert: true, new: true },
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ email }).exec();

    if (!userDoc) return null;

    return UserMapper.toDomain(userDoc);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec();

    if (!userDoc) return null;

    return UserMapper.toDomain(userDoc);
  }
}
