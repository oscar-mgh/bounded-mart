export class CreateStoreCommand {
  constructor(
    public readonly name: string,
    public readonly address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    },
  ) {}
}
