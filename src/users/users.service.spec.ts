import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { listUsersMock } from '../testing/users/list-users.mock';
import { createUserMock } from '../testing/users/create-user.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';

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

  describe('create', () => {
    it('Should create an user', async () => {
      const result = await service.create(createUserMock);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('findAll', () => {
    it('Should return an list of users', async () => {
      const result = await service.findAll();

      expect(result).toEqual(listUsersMock);
    });
  });

  describe('findOne', () => {
    it('Should return an user', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('profile', () => {
    it('Should return the profile of the user', async () => {
      const result = await service.profile(1);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('findByEmail', () => {
    it('Should return an user by email', async () => {
      const result = await service.findByEmail(listUsersMock[0].email);

      expect(result).toEqual(listUsersMock[0]);
    });
  });
});
