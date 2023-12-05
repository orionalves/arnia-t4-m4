import { RoleEnum } from '../../enums/role.enum';

export const usersListMock = [
  {
    id: 1,
    name: 'Luiz Felipe Dias',
    email: 'lf@gmail.com',
    role: RoleEnum.user,
    age: 27,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Nome Teste',
    email: 'teste@gmail.com',
    role: RoleEnum.user,
    age: 25,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Outro Teste',
    email: 'Outro@gmail.com',
    role: RoleEnum.user,
    age: 17,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
