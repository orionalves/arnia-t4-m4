import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDoc } from './create-user.doc';

export class UserCreatedDoc extends CreateUserDoc {
  @ApiProperty({
    type: Number,
    example: 1,
    description: "User's id.",
  })
  id: number;

  @ApiProperty({
    type: String,
    example: '$2b$10$dULryIfngofGfKX031h/q.7qnrgD0QlRGUq6MsWLgY7bTsYWvjuta',
    description: "User's password.",
    required: true,
  })
  password: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'If an user is active or not.',
  })
  isActive: boolean;

  @ApiProperty({
    type: Boolean,
    example: '2023-12-01T23:09:37.871Z',
    description: 'If an user is active or not.',
  })
  createdAt: Date;

  @ApiProperty({
    type: Boolean,
    example: '2023-12-01T23:09:37.871Z',
    description: 'If an user is active or not.',
  })
  updatedAt: Date;
}
