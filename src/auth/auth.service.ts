import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    try {
      // encontrar usuario
      const user = await this.userService.findByEmail(loginAuthDto.email);

      // comparar a senha do dto com a do banco
      // se nao, retorna o erro
      if (user.password !== loginAuthDto.password) {
        throw new UnauthorizedException();
      }

      // se sim, gera o token e retorna para o usuario
      const payload = {
        sub: user.id,
        email: user.email,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status || HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
