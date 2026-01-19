import { Types } from 'mongoose';

export class Id {
  private readonly value: string;
  constructor(value?: string) {
    if (value && !Types.ObjectId.isValid(value)) {
      throw new Error('Invalid Mongo ID');
    }
    this.value = value || new Types.ObjectId().toHexString();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Id): boolean {
    return this.value === other.getValue();
  }
}
