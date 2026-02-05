import { EntityFinderService } from 'src/modules/shared/application/services/entity-finder.service';
import { StoreRepositoryPort } from '../../domain/ports/store-repository.port';

export class DeleteStoreUseCase {
  constructor(
    private readonly repository: StoreRepositoryPort,
    private readonly entityFinder: EntityFinderService,
  ) {}

  async execute(id: string): Promise<void> {
    const store = await this.entityFinder.findOrThrow(this.repository, id, 'Store');
    store.deactivate();
    await this.repository.delete(id);
  }
}
