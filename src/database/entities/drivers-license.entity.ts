import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('driverslicenses')
export class DriversLicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 11, nullable: false })
  licenseNumber: string;

  @OneToOne(() => User, (user) => user.driversLicense)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
