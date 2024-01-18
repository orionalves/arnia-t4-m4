import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/guards/auth-guard';
import {
  authGuardMock,
  removeUserMock,
  updateUserMock,
  userUpdatedMock,
  usersListMock,
  usersServiceMock,
} from '../testing';

describe('Users Controller', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Read', () => {
    it('Should return a list of users', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(usersListMock);
      expect(result).toHaveLength(4);
    });

    it('Should return an user by id', async () => {
      const result = await usersController.findOne(1);

      expect(result).toEqual(usersListMock[0]);
    });
  });

  describe('Update', () => {
    it('Should update an user', async () => {
      const result = await usersController.update(1, updateUserMock);

      expect(result).toEqual(userUpdatedMock);
    });
  });

  describe('Delete', () => {
    it('Should remove an user', async () => {
      const result = await usersController.remove(1);

      expect(result).toEqual(removeUserMock);
    });
  });
});
