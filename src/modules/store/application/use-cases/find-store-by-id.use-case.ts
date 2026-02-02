import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { Store } from '../../domain/entities/store.entity';
import { StoreRepositoryPort } from '../../domain/ports/store-repository.port';

export class FindStoreByIdUseCase {
  constructor(
    private readonly storeRepository: StoreRepositoryPort,
    private readonly entityFinder: EntityFinderService,
  ) {}

  async execute(id: string): Promise<Store> {
    return await this.entityFinder.findOrThrow(this.storeRepository, id, 'Store');
  }
}
