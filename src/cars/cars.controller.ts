import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCarDoc } from 'src/docs/cars/create-car.doc';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiBody({
    type: CreateCarDoc,
  })
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

  @Patch(':id')
  async update(
    @Body() payload: UpdateCarDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.carsService.update(payload, id);
  }

  @Delete(':id')
  @HttpCode(202)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.delete(id);
  }
}
