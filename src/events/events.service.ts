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
import { Image } from './entities/image.entity';
import { ConfigService } from '@nestjs/config';
import { UpdateDateEvent } from './dto/update-date-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    private userService: UsersService,

    private configService: ConfigService,
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

  async saveImage(eventId: number, file: Express.Multer.File) {
    try {
      // verificar se o evento existe
      const event = await this.findOne(eventId);

      // verificar se o arquivo existe
      if (!file) {
        throw new BadRequestException('File doesnt exist');
      }

      // criar a imagem e vincular ao evento
      const url =
        this.configService.get('APP_DOMAIN') + '/events/image/' + file.filename;

      const image = this.imageRepository.create({
        imageLink: url,
        event,
      });

      await this.imageRepository.save(image);

      return image;
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
    return this.eventRepository.find();
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOneOrFail({
        where: { id },
        relations: {
          participants: true,
          images: true,
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

  async updateDate(id: number, updateDateEventDto: UpdateDateEvent) {
    try {
      const event = await this.findOne(id);

      event.eventDate = updateDateEventDto.eventDate;

      await this.eventRepository.save(event);

      return event;
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

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
