import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { DriversLicenseService } from './drivers-license.service';
import { CreateDriversLicenseDto } from './dto/create-drivers-license.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('drivers-license')
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
  findOne(@Param('id') id: string) {
    return this.driversLicenseService.findOne(+id);
  }
}
