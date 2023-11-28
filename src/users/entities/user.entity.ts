import { Address } from 'src/addresses/entities/address.entity';
import { Event } from 'src/events/entities/event.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Event, (event) => event.participants)
  events: Event[];

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
