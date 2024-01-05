import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectEntity } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      if (await this.subjectExists(createSubjectDto.subjectName)) {
        throw new BadRequestException(
          `Subject with name: ${createSubjectDto.subjectName} already exists.`,
        );
      }

      const newSubject = this.subjectRepository.create(createSubjectDto);

      await this.subjectRepository.save(newSubject);

      return newSubject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async subjectExists(subjectName: string) {
    return await this.subjectRepository.exist({ where: { subjectName } });
  }

  async list() {
    try {
      return await this.subjectRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async show(id: number) {
    try {
      const subject = await this.subjectRepository.findOne({ where: { id } });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      return subject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
