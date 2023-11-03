import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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

  async update(payload: UpdateCarDto, id: number) {
    try {
      const carToUpdate = await this.show(id);

      const carUpdated = Object.assign(carToUpdate, payload);

      this.carsDb.map((car) => {
        if (car.id == id) {
          car = carUpdated;
        }
      });

      return carUpdated;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.show(id);

      this.carsDb = this.carsDb.filter((car) => car.id !== id);

      return 'This car has been successfully deleted.';
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
