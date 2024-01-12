import { getRepositoryToken } from '@nestjs/typeorm';
import { House } from '../../databases/entities/House.entity';
import { houseMock } from './houses.mock';

export const houseRepositoryMock = {
  provide: getRepositoryToken(House),
  useValue: {
    create: jest.fn().mockReturnValue(houseMock),
    save: jest.fn(),
  },
};
