import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtOptions } from './jwt/jwt.config';

@Module({
  imports: [JwtModule.registerAsync({ ...jwtOptions, global: true })],
})
export class AuthModule {}
