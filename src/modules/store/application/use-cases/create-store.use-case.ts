import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/auth/domain/ports/user-repository.port';
import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Store } from '../../domain/entities/store.entity';
import { StoreRepositoryPort } from '../../domain/ports/store-repository.port';
import { Address } from '../../domain/value-objects/address.vo';
import { CreateStoreCommand } from './commands/create-store.command';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    private readonly storeRepository: StoreRepositoryPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(command: CreateStoreCommand, userId: string): Promise<Store> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.getStoreId()) {
      throw new ConflictException('User already owns a store');
    }

    const nameExists = await this.storeRepository.existsByName(command.name);
    if (nameExists) {
      throw new ConflictException(`Store with name "${command.name}" already exists`);
    }

    const address = new Address({
      street: command.address.street,
      city: command.address.city,
      state: command.address.state,
      zipCode: command.address.zipCode,
      country: command.address.country,
    });

    const storeId = Id.create();
    const store = new Store(storeId, command.name, [new Id(userId)], address, true, new Date(), new Date());

    user.assignStore(storeId);

    await this.storeRepository.save(store);
    await this.userRepository.save(user);

    return store;
  }
}
