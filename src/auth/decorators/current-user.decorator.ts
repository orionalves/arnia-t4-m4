import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CurrentUserDto } from '../dto/current-user.dto';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): CurrentUserDto => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
