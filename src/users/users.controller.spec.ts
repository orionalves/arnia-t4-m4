import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/auth.guard';
import {
  authGuardMock,
  createUserMock,
  userCreatedMoc,
  usersListMock,
  usersServiceMock,
} from '../testing';
import { requestMock } from '../testing/req/request.mock';

describe('Users controller', () => {
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

  describe('Create', () => {
    it('Should create an user', async () => {
      const result = await usersController.create(createUserMock);

      expect(result).toEqual(userCreatedMoc);
    });
  });

  describe('Read', () => {
    it('Should return a list of users', async () => {
      const result = await usersController.list();

      expect(result).toEqual(usersListMock);
    });

    it('Should return an user by id', async () => {
      const result = await usersController.show(1);

      expect(result).toEqual(usersListMock[0]);
    });

    it('Should return an users profile', async () => {
      const result = await usersController.profile(requestMock as any);

      expect(result).toEqual(usersListMock[0]);
    });
  });

  describe('Auth guard', () => {
    it('Auth guard is applied on profile route', async () => {
      const guards = Reflect.getMetadata('__guards__', usersController.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});
