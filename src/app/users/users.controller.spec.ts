import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userServiceMock } from '../../testing/users/user-service.mock';
import { userMock, usersMock } from '../../testing/users/users.mock';
import { userUpdatedMock } from '../../testing/users/user-update.dto.mock';

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

  describe('update', () => {
    it('Should update a user', async () => {
      const result = await controller.update('1', userUpdatedMock);

      expect(result).toEqual(userMock);
    });
  });

  describe('remove', () => {
    it('Should remove a user', async () => {
      // spy a function =>  Escutar uma função ou analisar uma função.
      const removeFunc = jest.spyOn(userServiceMock.useValue, 'remove');

      const result = await controller.remove('1');

      expect(result).toEqual({ message: 'User deleted with success!!' });

      // verificar se esta funçao foi chamada apenas 1x
      expect(removeFunc).toHaveBeenCalledTimes(1);
    });
  });
});
