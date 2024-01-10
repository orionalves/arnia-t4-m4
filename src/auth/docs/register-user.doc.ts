import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum } from '../../enums/role.enum';

export class RegisterUserDoc {
  @ApiProperty({
    type: String,
    description: 'To register an user needs to pass a name.',
    default: 'Luiz Felipe',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description:
      'Email to register an user. Needs to be unique on application.',
    default: 'lf@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for user to login.',
    default: '12345',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: RoleEnum,
    enum: RoleEnum,
    description: 'Role for an user to validate permissions',
    required: true,
  })
  role: RoleEnum;
}
