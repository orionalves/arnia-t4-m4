import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const { email, password } = payload;

      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('email or password wrong.');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('email or password wrong.');
      }

      const tokenPayload = {
        iss: 'arnia-cars',
        sub: 'authorization',
        aud: 'arnia-cars-users',
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
      };

      return {
        token: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
