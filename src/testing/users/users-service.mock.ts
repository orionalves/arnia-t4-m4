import { UsersService } from '../../users/users.service';
import { removeUserMock } from './remove-user.mock';
import { userUpdatedMock } from './updated-user.mock';
import { usersListMock } from './users-list.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findAll: jest.fn().mockResolvedValue(usersListMock),
    findOne: jest.fn().mockResolvedValue(usersListMock[0]),
    update: jest.fn().mockResolvedValue(userUpdatedMock),
    remove: jest.fn().mockResolvedValue(removeUserMock),
  },
};
