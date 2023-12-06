import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import {
  createUserMock,
  userCreatedMoc,
  userFoundByEmailMock,
  usersListMock,
  usersRepositoryMock,
} from '../testing';
import { User } from '../database/entities';

describe('Users service.', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, usersRepositoryMock],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('Should be defined.', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an user', async () => {
      const result = await usersService.create(createUserMock);

      expect(result).toEqual(userCreatedMoc);
    });
  });

  describe('Read', () => {
    it('Need to return a list of users.', async () => {
      const result = await usersService.find();

      expect(result).toEqual(usersListMock);
    });

    it('Should return an user by id', async () => {
      const result = await usersService.findById(1);

      expect(result).toEqual(usersListMock[0]);
    });

    it('Should return an user by email', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValueOnce(userFoundByEmailMock as User);

      const result = await usersService.findByEmail('lf@gmail.com');

      expect(result).toEqual(userFoundByEmailMock);
    });
  });
});
