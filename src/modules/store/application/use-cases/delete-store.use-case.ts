import { NotFoundException } from '@nestjs/common';
import { StoreRepositoryPort } from '../../domain/ports/store-repository.port';

export class DeleteStoreUseCase {
  constructor(private readonly repository: StoreRepositoryPort) {}

  async execute(id: string): Promise<void> {
    const store = await this.repository.findById(id);

    if (!store) {
      throw new NotFoundException(`Store not found`);
    }

    await this.repository.delete(id);
  }
}
