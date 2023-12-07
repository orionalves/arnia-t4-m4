import { UsersService } from '../../users/users.service';
import { loginUserMock } from '../auth/login-user.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn().mockResolvedValue(loginUserMock),
  },
};
