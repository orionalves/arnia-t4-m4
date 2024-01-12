import { RoleEnum } from '../../enums/role.enum';
import { RegisterUserDto } from '../../auth/dtos/register-user.dto';

export const createUserMock: RegisterUserDto = {
  name: 'Luiz Felipe',
  email: 'lf@gmail.com',
  password: '12345',
  role: RoleEnum.admin,
};
