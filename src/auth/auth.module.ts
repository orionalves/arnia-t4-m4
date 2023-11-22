import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtOptions } from './jwt/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.registerAsync({ ...jwtOptions, global: true })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
