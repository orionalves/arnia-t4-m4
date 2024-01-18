import { PartialType } from '@nestjs/swagger';

import { RegisterUserDto } from '../../auth/dtos/register-user.dto';
import { IsEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsEmpty({
    message: 'password should not exists.',
  })
  password?: string;
}
