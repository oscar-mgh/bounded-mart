export class Sku {
  constructor(private readonly value: string) {
    if (!this.value || this.value.length < 4) {
      throw new Error('Invalid SKU: String is too short or empty');
    }
  }

  public getValue(): string {
    return this.value;
  }
}