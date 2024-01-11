import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDoc {
  @ApiProperty({
    type: String,
    description: 'An email for user login.',
    example: 'lf@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'An password for user login.',
    example: '1245',
    required: true,
  })
  password: string;
}
