export class ProductDiscount {
  constructor(
    private readonly code: string,
    private readonly percentage: number,
    private readonly expirationDate: Date,
  ) {
    if (percentage <= 0 || percentage > 100) {
      throw new Error('El porcentaje debe estar entre 1 y 100');
    }
  }

  public getCode() {
    return this.code;
  }

  public getPercentage() {
    return this.percentage;
  }

  public getExpirationDate() {
    return this.expirationDate;
  }

  public isExpired(): boolean {
    return new Date() > this.expirationDate;
  }

  public getDiscountAmount(price: number): number {
    if (this.isExpired()) return 0;
    return price * (this.percentage / 100);
  }
}
