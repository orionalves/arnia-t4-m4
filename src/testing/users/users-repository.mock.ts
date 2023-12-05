import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../database/entities';
import { userCreatedMoc } from './user-created.mock';
import { usersListMock } from './users-list.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(userCreatedMoc),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(usersListMock),
    findOne: jest.fn().mockResolvedValue(usersListMock[0]),
  },
};
