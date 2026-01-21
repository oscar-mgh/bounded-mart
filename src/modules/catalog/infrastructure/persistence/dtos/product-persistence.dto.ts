export interface ProductPersistenceDto {
  readonly _id: string;
  readonly sku: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly active: boolean;
  readonly category: string;
  readonly discount?: {
    readonly code: string;
    readonly percentage: number;
    readonly expirationDate: Date;
  } | null;
}
