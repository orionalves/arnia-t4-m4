import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import {
  jwtServiceMock,
  loginCredentialsMock,
  tokenMock,
  usersServiceMock,
} from '../testing';

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, jwtServiceMock, usersServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Login', () => {
    it('Should generate a token for user', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await authService.login(loginCredentialsMock);

      expect(result).toEqual({ token: tokenMock });
    });
  });
});
