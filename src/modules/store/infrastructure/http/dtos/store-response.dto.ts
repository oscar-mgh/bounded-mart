export interface StoreResponseDto {
  readonly id: string;
  readonly name: string;
  readonly adminIds: string[];
  readonly address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
