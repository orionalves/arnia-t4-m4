import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user;
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

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneByOrFail({ id });
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          isActive: true,
          password: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException();
      }

      await this.userRepository.update(id, updateUserDto);

      return this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          message: error,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async softDelete(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException();
      }

      user.isActive = false;

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: error.status || HttpStatus.BAD_REQUEST,
          message: error,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
