import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriversLicenseDto {
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;
}
