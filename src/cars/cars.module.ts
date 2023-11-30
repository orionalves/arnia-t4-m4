import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car, CarPhotos } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarPhotos])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
