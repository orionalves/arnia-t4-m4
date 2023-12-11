import { getRepositoryToken } from '@nestjs/typeorm';
import { CarPhotos } from '../../database/entities';
import { carPhotoMock } from './car-photos.mock';

export const carsPhotosRepositoryMock = {
  provide: getRepositoryToken(CarPhotos),
  useValue: {
    create: jest.fn().mockReturnValue(carPhotoMock),
    save: jest.fn(),
  },
};
