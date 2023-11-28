import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DriversLicenseModule } from './drivers-license/drivers-license.module';
import { AuctionsModule } from './auctions/auctions.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CarsModule,
    UsersModule,
    DriversLicenseModule,
    AuctionsModule,
  ],
})
export class AppModule {}
