import { BadRequestException } from '@nestjs/common';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DriversLicense } from './drivers-license.entity';
import { Car } from './car.entity';
import { Auction } from './auction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 32 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 64, select: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToOne(() => DriversLicense, (dl) => dl.user)
  driversLicense: DriversLicense;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @ManyToMany(() => Auction, (auction) => auction.users)
  auctions: Auction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('An error occurred with hashing password.');
    }
  }
}
