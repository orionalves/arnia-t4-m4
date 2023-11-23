import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
