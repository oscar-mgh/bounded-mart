import { Types, isValidObjectId } from 'mongoose';

export class Id {
  private readonly value: string;

  constructor(value?: string) {
    if (value && !isValidObjectId(value)) {
      throw new Error('Invalid Domain ID format');
    }
    this.value = value || new Types.ObjectId().toHexString();
  }

  getValue(): string {
    return this.value;
  }
}