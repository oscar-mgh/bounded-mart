import { Id } from 'src/modules/shared/domain/value-objects/id.vo';
import { Address } from '../value-objects/address.vo';

export class Store {
  constructor(
    public readonly id: Id,
    private name: string,
    private adminIds: Id[],
    private address: Address,
    private active: boolean = true,
    private readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {
    this.validate();
  }

  private validate() {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Store name is required');
    }
    if (!this.address) {
      throw new Error('Store address is required');
    }
  }

  public getId(): Id {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAdminIds(): Id[] {
    return this.adminIds;
  }

  public getAddress(): Address {
    return this.address;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public changeName(name: string) {
    this.name = name;
    this.updatedAt = new Date();
    this.validate();
  }

  public changeAddress(address: Address) {
    this.address = address;
    this.updatedAt = new Date();
    this.validate();
  }

  public activate() {
    this.active = true;
  }

  public deactivate() {
    this.active = false;
  }

  public update(name: string, address?: Address) {
    this.changeName(name);
    if (address) {
      this.changeAddress(address);
    }
  }
}
