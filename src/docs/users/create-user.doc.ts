import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enums/role.enum';

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    example: 'Luiz Felipe Dias',
    description: "User's name.",
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'luiz-example@gmail.com',
    description: "User's email.",
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: "User's password.",
    required: true,
  })
  password: string;

  @ApiProperty({
    example: RoleEnum.user,
    description: "User's role.",
    required: false,
    default: RoleEnum.user,
  })
  role: RoleEnum;

  @ApiProperty({
    type: Number,
    example: 19,
    description: "User's age.",
    required: false,
  })
  age: number;
}
