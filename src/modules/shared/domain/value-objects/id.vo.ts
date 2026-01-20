import { Types, isValidObjectId } from 'mongoose';

export class Id {
  private readonly value: string;

  constructor(value?: string) {
    if (value && !isValidObjectId(value)) {
      throw new Error('Invalid Domain ID format');
    }
    this.value = value || new Types.ObjectId().toHexString();
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Id): boolean {
    return this.value === other.getValue();
  }

  public static create(value?: string): Id {
    return new Id(value);
  }
}