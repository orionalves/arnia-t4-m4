import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum } from '../../enums/role.enum';

export class UpdateUserDoc {
  @ApiProperty({
    type: String,
    description: 'Name for updating user.',
    example: 'Luiz',
    required: false,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email to update an user.',
    example: 'lf@gmail.com',
    required: false,
  })
  email: string;

  @ApiProperty({
    type: RoleEnum,
    enum: RoleEnum,
    description: 'Role to update an user.',
    example: RoleEnum.instructor,
    required: false,
  })
  role: RoleEnum;
}
