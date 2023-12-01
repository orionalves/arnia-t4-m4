import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';

import { DriversLicenseService } from './drivers-license.service';
import { CreateDriversLicenseDto } from './dto/create-drivers-license.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('drivers-licenses')
@ApiTags('drivers-licenses')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DriversLicenseController {
  constructor(private readonly driversLicenseService: DriversLicenseService) {}

  @Post()
  async create(
    @Body() payload: CreateDriversLicenseDto,
    @Request() req: Request,
  ) {
    const { userId } = req['user'];

    return await this.driversLicenseService.create(payload, userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.driversLicenseService.findOne(+id);
  }
}
