export interface EntityWithStatus {
  isActive(): boolean;
}

export interface GenericRepositoryPort<T extends EntityWithStatus> {
  findById(id: string, options?: any): Promise<T | null>;
}

export interface UserSearchableRepository<T> {
  findByUserId(ownerId: string): Promise<T | null>;
}
