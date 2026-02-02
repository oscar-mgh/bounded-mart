export interface StorePersistenceDto {
  readonly _id: string;
  readonly name: string;
  readonly adminIds: string[];
  readonly address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
