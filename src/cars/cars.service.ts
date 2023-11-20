import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '../database/entities';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async create(payload: CreateCarDto) {
    try {
      const newCar = this.carsRepository.create(payload);

      await this.carsRepository.save(newCar);

      return newCar;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async find(brand?: string) {
    try {
      return await this.carsRepository.find({ where: { brand } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
