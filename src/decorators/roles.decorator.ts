import { Reflector } from '@nestjs/core';
import { USER_ROLE } from '../enums/user-role.enum';

export const Roles = Reflector.createDecorator<USER_ROLE[]>();
