import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
