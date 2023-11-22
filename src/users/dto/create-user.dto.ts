import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(128)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  password: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
