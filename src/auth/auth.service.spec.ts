import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import {
  createUserMock,
  jwtServiceMock,
  loginPayloadMock,
  loginResponseMock,
  usersListMock,
  usersRepositoryMock,
} from '../testing';

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, usersRepositoryMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Create', () => {
    it('Should register a new user.', async () => {
      const newUser = await authService.register(createUserMock);

      expect(newUser).toEqual(usersListMock[0]);
    });
  });

  describe('Login', () => {
    it('Should return a jwt token.', async () => {
      const result = await authService.login(loginPayloadMock);

      expect(result).toEqual(loginResponseMock);
    });
  });
});
