import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @Get()
  async find(@Request() req: Request, @Query('brand') brand?: string) {
    return await this.carsService.find(brand);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.show(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCarDto,
  ) {
    return await this.carsService.update(id, payload);
  }

  @Patch(':id/buy/')
  @UseGuards(AuthGuard)
  async buy(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
    const { userId } = req['user'];

    return await this.carsService.buy(id, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.delete(id);
  }
}
