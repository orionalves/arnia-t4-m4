import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  carName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1886)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  color: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  brand: string;
}
