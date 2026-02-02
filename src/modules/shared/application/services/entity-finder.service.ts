import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityWithStatus, GenericRepositoryPort, UserSearchableRepository } from '../../domain/ports/repository.port';

@Injectable()
export class EntityFinderService {
  async findOrThrow<T extends EntityWithStatus>(
    repository: GenericRepositoryPort<T>,
    id: string,
    entityName: string,
    options?: any,
  ): Promise<T> {
    const entity = await repository.findById(id, options);

    if (!entity) {
      throw new NotFoundException(`${entityName} with ID "${id}" not found`);
    }

    if (!entity.isActive()) {
      throw new GoneException(`${entityName} with ID "${id}" is inactive/deleted`);
    }

    return entity;
  }

  async findByUserOrThrow<T extends EntityWithStatus>(
    repository: UserSearchableRepository<T>,
    ownerId: string,
    entityName: string,
  ): Promise<T> {
    const entity = await repository.findByUserId(ownerId);

    if (!entity) {
      throw new NotFoundException(`${entityName} for user "${ownerId}" not found`);
    }

    if (!entity.isActive()) {
      throw new GoneException(`${entityName} is inactive`);
    }

    return entity;
  }
}
