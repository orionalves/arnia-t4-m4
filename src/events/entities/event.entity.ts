import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Image } from './image.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column()
  eventDate: Date;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Image, (image) => image.event)
  images: Image[];
}
