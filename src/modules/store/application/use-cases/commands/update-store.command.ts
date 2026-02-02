import { AddressProps } from 'src/modules/store/domain/value-objects/address.vo';

export interface UpdateStoreCommand {
  id: string;
  name?: string;
  address?: Partial<AddressProps>;
}
