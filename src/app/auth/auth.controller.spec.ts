import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { userRegisterDtoMock } from '../../testing/auth/user-register.dto.mock';
import { userMock } from '../../testing/users/users.mock';
import { userLoginDtoMock } from '../../testing/auth/user-login.dto.mock';
import { tokenMock } from '../../testing/auth/token.mock';
import { authServiceMock } from '../../testing/auth/auth-service.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('Should return a registered user', async () => {
      const result = await controller.register(userRegisterDtoMock);

      expect(result).toEqual(userMock);
    });
  });

  describe('login', () => {
    it('Should return a user access token', async () => {
      const result = await controller.login(userLoginDtoMock);

      expect(result).toEqual(tokenMock);
    });
  });
});
