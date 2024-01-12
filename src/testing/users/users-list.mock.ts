import { RoleEnum } from '../../enums/role.enum';

export const usersListMock = [
  {
    id: 1,
    name: 'Luiz Felipe',
    email: 'lf@gmail.com',
    password: '12345',
    role: RoleEnum.admin,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Sidney',
    email: 'sid@gmail.com',
    password: '12345',
    role: RoleEnum.instructor,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Roberto',
    email: 'robs@gmail.com',
    password: '12345',
    role: RoleEnum.student,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 4,
    name: 'Juliana',
    email: 'july@gmail.com',
    password: '12345',
    role: RoleEnum.instructor,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
