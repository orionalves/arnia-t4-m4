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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDoc, UserCreatedDoc, UserFoundDoc } from '../docs';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    type: CreateUserDoc,
  })
  @ApiResponse({
    type: UserCreatedDoc,
  })
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @Get()
  @ApiResponse({
    type: UserFoundDoc,
    isArray: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async list() {
    return await this.usersService.find();
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({
    type: UserFoundDoc,
  })
  @UseGuards(AuthGuard)
  async profile(@Request() req: Request) {
    const { userId } = req['user'];

    return await this.usersService.findById(userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    type: UserFoundDoc,
  })
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }
}
