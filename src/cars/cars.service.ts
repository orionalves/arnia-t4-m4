import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private carsDb = [];

  create(payload: CreateCarDto) {
    const id = this.carsDb.length + 1;

    const newCar = {
      id,
      name: payload.name,
      color: payload.color,
    };

    this.carsDb.push(newCar);

    return newCar;
  }

  find() {
    return this.carsDb;
  }

  async show(id: number) {
    try {
      const carFound = this.carsDb.find((car) => car.id == id);

      if (!carFound) {
        throw new NotFoundException(`A car with id: ${id} not found.`);
      }

      return carFound;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
