import { Test, TestingModule } from '@nestjs/testing';

import { CarsService } from './cars.service';
import {
  carsRepositoryMock,
  carsPhotosRepositoryMock,
  configServiceMock,
  carPhotoMock,
} from '../testing';
import { getFileMock } from '../testing/cars/file.mock';

describe('Cars Service', () => {
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        carsRepositoryMock,
        carsPhotosRepositoryMock,
        configServiceMock,
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  it('Should be defined', () => {
    expect(carsService).toBeDefined();
  });

  describe('Upload file', () => {
    it('Should upload a new file', async () => {
      const result = await carsService.addPhoto(1, await getFileMock());

      expect(result).toEqual(carPhotoMock);
    });
  });
});
