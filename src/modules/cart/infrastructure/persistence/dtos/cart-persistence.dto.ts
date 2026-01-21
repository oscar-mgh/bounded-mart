export interface CartPersistenceDto {
  readonly _id: string;
  readonly userId: string;
  readonly items: {
    readonly productId: string;
    readonly quantity: number;
  }[];
  readonly updatedAt: Date;
}
