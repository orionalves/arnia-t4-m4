import { CanActivate, ExecutionContext } from '@nestjs/common';
import { requestMock } from '../req';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['user'] = requestMock;

    return true;
  }),
};
