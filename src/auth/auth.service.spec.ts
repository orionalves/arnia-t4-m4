import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { loginUserMock } from '../testing/auth/login-user.mock';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock';
import { token_mock } from '../testing/auth/token.mock';
import { userServiceMock } from '../testing/users/user-service.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, jwtServiceMock, userServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('Should return a token', async () => {
      const loginAuth = {
        email: loginUserMock.email,
        password: loginUserMock.password,
      };
      const result = await service.login(loginAuth);

      expect(result).toEqual({ access_token: token_mock });
    });
  });
});
