import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarPhotos } from '../database/entities';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    @InjectRepository(CarPhotos)
    private carPhotosRepository: Repository<CarPhotos>,

    private configService: ConfigService,
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

  async addPhoto(id: number, file: Express.Multer.File) {
    try {
      const carToAddPhoto = await this.show(id);

      if (!file) {
        throw new BadRequestException('File is not an image.');
      }

      const fileUrl = `${this.configService.get('APP_DOMAIN')}cars/photos/${
        file.filename
      }`;

      const newPhoto = this.carPhotosRepository.create({
        photoUrl: fileUrl,
        car: carToAddPhoto,
      });

      await this.carPhotosRepository.save(newPhoto);

      return newPhoto;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async find(brand?: string) {
    try {
      return await this.carsRepository.find({
        where: { brand },
        relations: {
          photos: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async show(id: number) {
    try {
      const carFound = await this.carsRepository.findOne({
        where: { id },
        relations: { user: true },
      });

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

  async buy(id: number, userId: number) {
    try {
      const car = await this.show(id);

      Object.assign(car, { user: { id: userId } });

      await this.carsRepository.save(car);

      return await this.show(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.show(id);

      await this.carsRepository.delete(id);

      return { result: 'Car deleted.' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
