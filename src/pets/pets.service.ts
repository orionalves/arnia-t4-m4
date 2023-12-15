import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    private userService: UsersService,
  ) {}

  async create(createPetDto: CreatePetDto, userId: number) {
    try {
      const user = await this.userService.findOne(userId);

      const pet = this.petRepository.create(createPetDto);

      pet.user = user;

      await this.petRepository.save(pet);

      return pet;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(breed?: string) {
    try {
      const pets = await this.petRepository.find({
        where: {
          breed,
        },
      });

      return pets;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const pet = await this.petRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });
      return pet;
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMyPets(userId: number) {
    try {
      const pets = await this.petRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });

      return pets;
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto, userId: number) {
    try {
      const pet = await this.findOne(id);

      if (pet.user.id !== userId) {
        throw new UnauthorizedException('This pet belongs to other user');
      }

      const { affected } = await this.petRepository.update(id, updatePetDto);

      if (!affected) {
        throw new BadRequestException('Somithing went wrong!');
      }

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
