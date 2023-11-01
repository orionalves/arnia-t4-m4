import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() payload: CreateCarDto) {
    return this.carsService.create(payload);
  }

  @Get()
  find() {
    return this.carsService.find();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.show(id);
  }
}
