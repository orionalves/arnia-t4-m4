import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

import { RoleEnum } from '../../enums/role.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(0, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}
