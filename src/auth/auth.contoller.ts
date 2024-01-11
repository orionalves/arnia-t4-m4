import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDoc } from './docs/register-user.doc';
import { UserCreatedDoc } from './docs/user-created.doc';
import { LoginUserDoc } from './docs/login-user.doc';
import { LoginResponseDoc } from './docs/login-response.doc';
import { AuthGuard } from './guards/auth-guard';
import { RolesGuard } from './guards/roles-guard';
import { Roles } from './decorators/role.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiBody({
    type: RegisterUserDoc,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserCreatedDoc,
  })
  @ApiBearerAuth()
  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }

  @ApiBody({
    type: LoginUserDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDoc,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
