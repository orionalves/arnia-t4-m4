import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterUserDoc } from './docs/register-user.doc';
import { UserCreatedDoc } from './docs/user-created.doc';
import { LoginUserDoc } from './docs/login-user.doc';
import { LoginResponseDoc } from './docs/login-response.doc';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: RegisterUserDoc,
  })
  @ApiResponse({
    type: UserCreatedDoc,
  })
  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }

  @ApiBody({
    type: LoginUserDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
