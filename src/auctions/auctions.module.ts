import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  controllers: [AuctionsController],
  providers: [AuctionsService],
})
export class AuctionsModule {}
