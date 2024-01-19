import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { UsersService } from '../users/users.service';
import { userRepositoryMock } from '../../testing/users/user-repository.mock';
import { jwtServiceMock } from '../../testing/auth/jwt-service.mock';
import { houseRepositoryMock } from 'src/testing/houses/house-repository.mock';

describe('HousesController', () => {
  let controller: HousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousesController],
      providers: [
        HousesService,
        houseRepositoryMock,
        UsersService,
        userRepositoryMock,
        jwtServiceMock,
      ],
    }).compile();

    controller = module.get<HousesController>(HousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
