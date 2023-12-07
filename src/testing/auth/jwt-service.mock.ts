import { JwtService } from '@nestjs/jwt';
import { token_mock } from './token.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn().mockResolvedValue(token_mock),
  },
};
