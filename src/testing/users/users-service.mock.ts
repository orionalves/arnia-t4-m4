import { UsersService } from '../../users/users.service';
import { userCreatedMoc } from './user-created.mock';
import { userFoundByEmailMock } from './users-found-by-email.mock';
import { usersListMock } from './users-list.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findByEmail: jest.fn().mockResolvedValue(userFoundByEmailMock),
    findById: jest.fn().mockResolvedValue(usersListMock[0]),
    create: jest.fn().mockResolvedValue(userCreatedMoc),
    find: jest.fn().mockResolvedValue(usersListMock),
  },
};
