import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userServiceMock } from '../../testing/users/user-service.mock';
import { userMock, usersMock } from '../../testing/users/users.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return a list of users', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('Should return a user', async () => {
      const result = await controller.findOne('1');

      expect(result).toEqual(userMock);
    });
  });
});
