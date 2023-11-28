import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../database/entities';

@Controller('auctions')
@UseGuards(AuthGuard)
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  async create(@Body() payload: CreateAuctionDto) {
    return await this.auctionsService.create(payload);
  }

  @Get()
  async findAll() {
    return await this.auctionsService.findAll();
  }

  @Patch(':id/participate')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() currentUser: any,
  ) {
    return await this.auctionsService.update(+id, currentUser.userId);
  }
}
