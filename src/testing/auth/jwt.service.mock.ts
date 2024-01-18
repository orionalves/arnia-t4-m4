import { JwtService } from '@nestjs/jwt';
import { loginResponseMock } from './login-response.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(loginResponseMock.token),
  },
};
