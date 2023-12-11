import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../../database/entities';
import { carMock } from './car.mock';

export const carsRepositoryMock = {
  provide: getRepositoryToken(Car),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn().mockResolvedValue(carMock),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
