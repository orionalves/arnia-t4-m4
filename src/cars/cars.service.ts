import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { Car } from '../database/entities';
import { UpdateCarDto } from './dto/update-car.dto';

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

  async show(id: number) {
    try {
      const carFound = await this.carsRepository.findOneBy({ id });

      if (!carFound) {
        throw new NotFoundException(`A car with this id: ${id} not found.`);
      }

      return carFound;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateCarDto) {
    try {
      await this.show(id);

      await this.carsRepository.update(id, payload);

      return await this.show(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
