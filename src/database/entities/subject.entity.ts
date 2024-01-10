import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  subjectName: string;

  @Column({ type: 'int', nullable: false })
  code: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  credits: number;

  @Column({ type: 'varchar', nullable: false })
  campus: string;

  @Column({ type: 'varchar', nullable: false })
  classRoom: string;

  @ManyToOne(() => UserEntity, (user) => user.subjects)
  instructor: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.studentSubjects, {
    onDelete: 'CASCADE',
  })
  students: UserEntity[];
}
