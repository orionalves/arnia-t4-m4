import { USER_ROLE } from '../../enums/user-role.enum';

export const userMock = {
  id: 1,
  name: 'Vitor',
  email: 'vitor.reis@arnia.com.br',
  password: '1234',
  role: USER_ROLE.SELLER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const usersMock = [userMock];
