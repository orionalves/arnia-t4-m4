import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CarPhotos } from './car-photos.entity';

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

  @ManyToOne(() => User, (user) => user.cars)
  user: User;

  @OneToMany(() => CarPhotos, (cp) => cp.car)
  photos: CarPhotos[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
