import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  carName: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  color: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  brand: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
