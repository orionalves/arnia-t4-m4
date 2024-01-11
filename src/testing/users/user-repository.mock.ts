import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../databases/entities/User.entity';
import { userMock, usersMock } from './users.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(userMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(usersMock),
    findOneByOrFail: jest.fn().mockResolvedValue(userMock),
    findOneOrFail: jest.fn().mockResolvedValue(userMock),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  },
};
