import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { UsersService } from '../users/users.service';
import { userRepositoryMock } from '../../testing/users/user-repository.mock';
import { houseMock } from '../../testing/houses/houses.mock';
import { houseCreateDtoMock } from '../../testing/houses/house-create.dto.mock';
import { houseRepositoryMock } from '../../testing/houses/house-repository.mock';

describe('HousesService', () => {
  let service: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousesService,
        userRepositoryMock,
        UsersService,
        houseRepositoryMock,
      ],
    }).compile();

    service = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Should return a new house', async () => {
      const result = await service.create(houseCreateDtoMock);

      expect(result).toEqual(houseMock);
    });
  });
});
