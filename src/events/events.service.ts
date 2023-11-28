import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    private userService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const event = this.eventRepository.create(createEventDto);

      await this.eventRepository.save(event);

      return event;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async partipate(eventId: number, userId: number) {
    try {
      // ver se o evento existe
      const userExist = await this.userService.findOne(userId);

      if (!userExist.isActive) {
        throw new NotFoundException("User doesn't exist");
      }

      // ver se o usuario existe
      const event = await this.findOne(eventId);

      event.participants.push(userExist);

      await this.eventRepository.save(event);
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status || HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOneOrFail({
        where: { id },
        relations: {
          participants: true,
        },
      });

      return event;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
