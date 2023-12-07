import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { RoleEnum } from '../../enums/role.enum';

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

  @IsOptional()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNumber()
  @IsOptional()
  age: number;
}
