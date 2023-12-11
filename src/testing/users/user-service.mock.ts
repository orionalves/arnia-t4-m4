import { UsersService } from '../../users/users.service';
import { loginUserMock } from '../auth/login-user.mock';
import { listUsersMock } from './list-users.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    create: jest.fn().mockResolvedValue(listUsersMock[0]),
    findAll: jest.fn().mockResolvedValue(listUsersMock),
    findByEmail: jest.fn().mockResolvedValue(loginUserMock),
    profile: jest.fn().mockResolvedValue(listUsersMock[0]),
    findOne: jest.fn().mockResolvedValue(listUsersMock[0]),
    update: jest.fn().mockResolvedValue(listUsersMock[0]),
    softDelete: jest.fn().mockResolvedValue(listUsersMock[0]),
  },
};
