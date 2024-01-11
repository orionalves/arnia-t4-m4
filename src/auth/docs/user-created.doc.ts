import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserDoc } from './register-user.doc';

export class UserCreatedDoc extends RegisterUserDoc {
  @ApiProperty({
    type: Number,
    description: 'Unique identificator for an user.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'When an user was created.',
    example: '2023-12-15',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was updated.',
    example: '2023-12-25',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'When an user was deleted.',
    example: '2023-12-15 20:26:01.585765',
  })
  deletedAt: Date;
}
