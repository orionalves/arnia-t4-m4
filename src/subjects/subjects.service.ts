import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectEntity, UserEntity } from '../database/entities';
import { Repository } from 'typeorm';
import { UpdateSubjectDto } from './dto/update-subject.dto';

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

  async showClass(id: number) {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id },
        relations: { instructor: true, students: true },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      return subject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async addStudent(id: number, currentUser: UserEntity) {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id },
        relations: { students: true },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      subject.students.push(currentUser);

      await this.subjectRepository.save(subject);

      return subject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async addInstructor(id: number, currentUser: UserEntity) {
    try {
      const subject = await this.subjectRepository.findOne({
        where: { id },
        relations: {
          instructor: true,
        },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      if (subject.instructor) {
        throw new BadRequestException(
          'This subject already has an instructor.',
        );
      }

      this.subjectRepository.merge(subject, { instructor: currentUser });

      await this.subjectRepository.save(subject);

      return subject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateSubjectDto) {
    try {
      const subject = await this.subjectRepository.findOne({ where: { id } });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      await this.subjectRepository.save(Object.assign(subject, payload));

      return subject;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      if (!(await this.subjectRepository.exist({ where: { id } }))) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      await this.subjectRepository.delete(id);

      return {
        message: 'Subject deleted successfully.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
