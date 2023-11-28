import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
