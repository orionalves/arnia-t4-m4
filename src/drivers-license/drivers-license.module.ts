import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriversLicenseService } from './drivers-license.service';
import { DriversLicenseController } from './drivers-license.controller';
import { DriversLicense } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([DriversLicense])],
  controllers: [DriversLicenseController],
  providers: [DriversLicenseService],
})
export class DriversLicenseModule {}
