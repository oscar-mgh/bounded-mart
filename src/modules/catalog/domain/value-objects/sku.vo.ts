export class Sku {
  private readonly value: string;

  constructor(value: string) {
    const skuPattern = /^PROD-\d+$/;
    if (!skuPattern.test(value)) {
      throw new Error('Invalid SKU: Must follow the pattern PROD-123');
    }
    this.value = value.toUpperCase();
  }

  get val(): string {
    return this.value;
  }
}
