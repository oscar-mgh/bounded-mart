import { Injectable } from '@nestjs/common';
import { StoreIntegrationPort } from 'src/modules/catalog/domain/ports/store-integration.port';
import { StoreRepositoryPort } from 'src/modules/store/domain/ports/store-repository.port';

@Injectable()
export class StoreIntegrationAdapter implements StoreIntegrationPort {
  constructor(private readonly storeRepository: StoreRepositoryPort) {}

  async isStoreActive(storeId: string): Promise<boolean> {
    const store = await this.storeRepository.findById(storeId);
    return !!(store && store.isActive());
  }
}
