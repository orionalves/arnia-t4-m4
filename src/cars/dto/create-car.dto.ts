import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({
    message: 'A cor precisa ser uma string',
  })
  @IsNotEmpty()
  color: string;
}
