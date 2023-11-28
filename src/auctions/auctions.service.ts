import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction } from '../database/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private auctionsRepository: Repository<Auction>,

    private usersService: UsersService,
  ) {}

  async create(payload: CreateAuctionDto) {
    try {
      const newAuction = this.auctionsRepository.create(payload);

      await this.auctionsRepository.save(newAuction);

      return newAuction;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.auctionsRepository.find({ relations: { users: true } });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const auctionFound = await this.auctionsRepository.findOne({
        where: { id },
        relations: {
          users: true,
        },
      });

      if (!auctionFound) {
        throw new BadRequestException('Auction not found.');
      }

      return auctionFound;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, userId: number) {
    try {
      const auctionToUpdate = await this.findOne(id);
      const userToParticipate = await this.usersService.findById(userId);

      auctionToUpdate.users.push(userToParticipate);
      await this.auctionsRepository.save(auctionToUpdate);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
