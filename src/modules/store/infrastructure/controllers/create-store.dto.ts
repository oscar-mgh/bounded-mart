import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';

class AddressDto {
  @IsString() @IsNotEmpty() street: string;
  @IsString() @IsNotEmpty() city: string;
  @IsString() @IsNotEmpty() state: string;
  @IsString() @IsNotEmpty() zipCode: string;
  @IsString() @IsNotEmpty() country: string;
}

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;
}
