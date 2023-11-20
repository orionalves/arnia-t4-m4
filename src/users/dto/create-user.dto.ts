import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(5, 50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3)
  password: string;
}