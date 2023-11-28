import { Injectable } from '@nestjs/common';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Injectable()
export class AuctionsService {
  create(createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }

  findAll() {
    return `This action returns all auctions`;
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }
}
