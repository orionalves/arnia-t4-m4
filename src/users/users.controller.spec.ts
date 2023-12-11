import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userServiceMock } from '../testing/users/user-service.mock';
import { AuthGuard } from '../auth/auth.guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createUserMock } from '../testing/users/create-user.mock';
import { listUsersMock } from '../testing/users/list-users.mock';
import { requestProfileMock } from '../testing/request/request-profile.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create a user', async () => {
      const result = await controller.create(createUserMock);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('findAll', () => {
    it('Should return a list of users', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(listUsersMock);
    });
  });

  describe('profile', () => {
    it("Should return a users's profile", async () => {
      const result = await controller.profile(requestProfileMock as any);

      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('testGuards', () => {
    it('Should verify if a guard was applied', async () => {
      const guards = Reflect.getMetadata('__guards__', controller.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});
