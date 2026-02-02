export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class Address {
  constructor(private readonly props: AddressProps) {
    this.validate();
  }

  private validate() {
    if (!this.props.street) throw new Error('Street is required');
    if (!this.props.city) throw new Error('City is required');
    if (!this.props.state) throw new Error('State is required');
    if (!this.props.zipCode) throw new Error('Zip Code is required');
    if (!this.props.zipCode || this.props.zipCode.length < 5) throw new Error('Zip Code is too short');
    if (!this.props.country) throw new Error('Country is required');
  }

  public getStreet(): string {
    return this.props.street;
  }
  public getCity(): string {
    return this.props.city;
  }
  public getState(): string {
    return this.props.state;
  }
  public getZipCode(): string {
    return this.props.zipCode;
  }
  public getCountry(): string {
    return this.props.country;
  }

  public toString(): string {
    return `${this.props.street}, ${this.props.city}, ${this.props.zipCode}, ${this.props.country}`;
  }
}
