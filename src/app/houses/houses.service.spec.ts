import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HousesService } from './houses.service';
import { UsersService } from '../users/users.service';
import { userRepositoryMock } from '../../testing/users/user-repository.mock';
import { houseMock, housesMock } from '../../testing/houses/houses.mock';
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

  describe('FindAll', () => {
    it('Should return an list of houses', async () => {
      const result = await service.findAll();
      expect(result).toEqual(housesMock);
    });
  });

  describe('FindOne', () => {
    it('Should return a house', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(houseMock);
    });

    it('Should return a NotFound error', async () => {
      jest
        .spyOn(houseRepositoryMock.useValue, 'findOneOrFail')
        .mockRejectedValueOnce(false as never);
      const result = service.findOne(1);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});