import { Store } from '../entities/store.entity';

export abstract class StoreRepositoryPort {
  abstract save(store: Store): Promise<Store>;

  abstract findById(id: string): Promise<Store | null>;

  abstract findByAdminId(adminId: string): Promise<Store[]>;

  abstract existsByName(name: string): Promise<boolean>;

  abstract delete(id: string): Promise<void>;
}
