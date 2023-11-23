import { HttpException, Injectable } from '@nestjs/common';
import { CreateDriversLicenseDto } from './dto/create-drivers-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DriversLicense } from '../database/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class DriversLicenseService {
  constructor(
    @InjectRepository(DriversLicense)
    private driversLicenseRepository: Repository<DriversLicense>,

    private usersService: UsersService,
  ) {}

  async create(payload: CreateDriversLicenseDto, userId: number) {
    try {
      const user = await this.usersService.findById(userId);
      const { licenseNumber } = payload;

      const driversLicense = this.driversLicenseRepository.create({
        licenseNumber,
        user,
      });

      await this.driversLicenseRepository.save(driversLicense);

      return driversLicense;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} driversLicense`;
  }
}
