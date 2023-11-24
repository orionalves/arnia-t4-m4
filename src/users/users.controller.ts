import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: Request) {
    const { userId } = req['user'];

    return await this.usersService.findById(userId);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }
}
