import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @Get()
  async find(@Query('brand') brand?: string) {
    return await this.carsService.find(brand);
  }
}
