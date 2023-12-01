import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @Get()
  async find(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('brand') brand?: string,
  ) {
    return await this.carsService.find(page, limit, brand);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.show(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCarDto,
  ) {
    return await this.carsService.update(id, payload);
  }

  @Patch(':id/buy/')
  @UseGuards(AuthGuard)
  async buy(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
    const { userId } = req['user'];

    return await this.carsService.buy(id, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.delete(id);
  }

  @Post(':id/upload-photos')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + extension;

          cb(null, newFileName);
        },
      }),

      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }

        cb(null, true);
      },
    }),
  )
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.carsService.addPhoto(id, file);
  }

  @Get('photos/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
}
