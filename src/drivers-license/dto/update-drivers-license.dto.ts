import { PartialType } from '@nestjs/mapped-types';
import { CreateDriversLicenseDto } from './create-drivers-license.dto';

export class UpdateDriversLicenseDto extends PartialType(CreateDriversLicenseDto) {}
