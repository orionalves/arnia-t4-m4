import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
