import { IsEmail, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsMongoId()
  storeId: string;
}
