import { Types } from 'mongoose';

export class Id {
  constructor(private readonly value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ID format: Must be a valid Mongo ObjectId');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Id): boolean {
    return this.value === other.getValue();
  }
}
