import { UsersService } from '../../users/users.service';
import { userFoundByEmailMock } from './users-found-by-email.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn().mockResolvedValue(userFoundByEmailMock),
  },
};
