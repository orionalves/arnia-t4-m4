import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  breed: string;
}
