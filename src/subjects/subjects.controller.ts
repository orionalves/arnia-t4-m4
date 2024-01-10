import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../database/entities';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@ApiTags('Subjects')
@UseGuards(AuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Roles(RoleEnum.admin)
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async list() {
    return await this.subjectsService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.show(id);
  }

  @Roles(RoleEnum.admin, RoleEnum.instructor)
  @Get(':id/students')
  async showClass(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.showClass(id);
  }

  @Roles(RoleEnum.student)
  @Post(':id/students')
  async addStudent(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.subjectsService.addStudent(id, currentUser);
  }

  @Roles(RoleEnum.instructor)
  @Post(':id/instructors')
  async addInstructor(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.subjectsService.addInstructor(id, currentUser);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(id, payload);
  }

  @Roles(RoleEnum.admin)
  @HttpCode(202)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.delete(id);
  }
}
