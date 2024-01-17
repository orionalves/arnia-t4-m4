import { UsersService } from '../../app/users/users.service';
import { userMock, usersMock } from './users.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findUserByEmail: jest.fn().mockResolvedValue(userMock),
    findAll: jest.fn().mockResolvedValue(usersMock),
    findOne: jest.fn().mockResolvedValue(userMock),
  },
};
