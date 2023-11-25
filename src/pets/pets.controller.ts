import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createPetDto: CreatePetDto) {
    const user = req['user'];
    return this.petsService.create(createPetDto, +user.sub);
  }

  @Get()
  findAll(@Query('breed') breed?: string) {
    return this.petsService.findAll(breed);
  }

  @UseGuards(AuthGuard)
  @Get('my-pets')
  findMyPeys(@Req() req: Request) {
    const user = req['user'];
    return this.petsService.findMyPets(+user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.petsService.update(+id, updatePetDto, +user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
