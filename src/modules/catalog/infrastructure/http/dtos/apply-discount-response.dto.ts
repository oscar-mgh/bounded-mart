export class ApplyDiscountResponseDto {
  readonly message: string;
  readonly affectedProducts: number;
  readonly timestamp: string;

  constructor(message: string, affectedProducts: number) {
    this.message = message;
    this.affectedProducts = affectedProducts;
    this.timestamp = new Date().toISOString();
  }
}
