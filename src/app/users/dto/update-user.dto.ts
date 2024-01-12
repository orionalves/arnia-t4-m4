import { PartialType } from '@nestjs/swagger';
import { UserRegisterDto } from '../../auth/dto/user-register.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}