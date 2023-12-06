import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { listUsersMock } from './list-users.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn().mockReturnValue(listUsersMock[0]),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listUsersMock),
    findOneByOrFail: jest.fn().mockReturnValue(listUsersMock[0]),
    findOneOrFail: jest.fn().mockReturnValue(listUsersMock[0]),
    findOneBy: jest.fn().mockReturnValue(listUsersMock[0]),
  },
};
