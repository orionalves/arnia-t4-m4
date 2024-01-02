import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../database/entities';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterUserDto) {
    try {
      if (
        await this.usersRepository.exist({ where: { email: payload.email } })
      ) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async login(payload: LoginDto) {
    try {
      const { email, password } = payload;

      const userToLogin = await this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });

      if (!userToLogin) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const passwordMatch = await bcrypt.compare(
        password,
        userToLogin.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const tokenPayload = {
        iss: 'edusync',
        sub: 'auth',
        aud: 'users',
        id: userToLogin.id,
        email: userToLogin.email,
        role: userToLogin.role,
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
