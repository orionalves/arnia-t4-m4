import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../../database/entities';
import { usersListMock } from './users-list.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    exist: jest.fn(),
    create: jest.fn().mockReturnValue(usersListMock[0]),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(usersListMock[0]),
  },
};
