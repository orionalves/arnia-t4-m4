import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../../testing/users/user-repository.mock';
import { userMock, usersMock } from '../../testing/users/users.mock';
import { userUpdatedMock } from '../../testing/users/user-update.dto.mock';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return a list of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('Should return a user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(userMock);
    });
  });

  describe('findUserByEmail', () => {
    it('Should return a user', async () => {
      const result = await service.findUserByEmail(userMock.email);
      expect(result).toEqual(userMock);
    });
  });

  describe('Not find user by Id', () => {
    it('Should return the user of the given id', async () => {
      jest
        .spyOn(userRepositoryMock.useValue, 'findOneByOrFail')
        .mockRejectedValueOnce(false as never);

      const result = service.findOne(1);

      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Remove', () => {
    it('Should return a message of success after delete user', async () => {
      const result = await service.remove(1);

      expect(result).toEqual({ message: 'User deleted with success!!' });
    });
  });

  describe('Update', () => {
    it('Should return updated user data', async () => {
      const result = await service.update(1, userUpdatedMock);

      expect(result).toEqual(userMock);
    });
  });
});
