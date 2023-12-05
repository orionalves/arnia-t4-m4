import { RoleEnum } from '../../enums/role.enum';

export const userCreatedMoc = {
  id: 1,
  name: 'Luiz Felipe Dias',
  email: 'lf@gmail.com',
  password: '$2b$10$dULryIfngofGfKX031h/q.7qnrgD0QlRGUq6MsWLgY7bTsYWvjuta',
  role: RoleEnum.user,
  age: 27,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
