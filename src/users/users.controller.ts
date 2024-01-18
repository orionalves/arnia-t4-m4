import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { UserCreatedDoc } from '../auth/docs/user-created.doc';
import { UpdateUserDoc } from './docs/update-user.doc';
import { DeleteUserResponseDoc } from './docs/delete-user-response.doc';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: UserCreatedDoc,
    isArray: true,
  })
  @Roles(RoleEnum.admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiResponse({
    type: UserCreatedDoc,
  })
  @Roles(RoleEnum.admin)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(+id);
  }

  @ApiBody({
    type: UpdateUserDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedDoc,
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: DeleteUserResponseDoc,
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(+id);
  }
}
