import { Injectable } from '@nestjs/common';
import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { Store } from '../../domain/entities/store.entity';
import { StoreRepositoryPort } from '../../domain/ports/store-repository.port';
import { Address, AddressProps } from '../../domain/value-objects/address.vo';
import { UpdateStoreCommand } from './commands/update-store.command';

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    private readonly storeRepository: StoreRepositoryPort,
    private readonly entityFinder: EntityFinderService,
  ) {}

  async execute(command: UpdateStoreCommand): Promise<Store> {
    const { id, name, address } = command;
    const store = await this.entityFinder.findOrThrow(this.storeRepository, id, 'Store');
    const addressVO = address ? new Address(address as AddressProps) : store.getAddress();
    
    store.update(name ?? store.getName(), addressVO);
    return await this.storeRepository.save(store);
  }
}
