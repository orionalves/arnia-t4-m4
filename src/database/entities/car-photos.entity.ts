import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('carphotos')
export class CarPhotos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 132 })
  photoUrl: string;

  @ManyToOne(() => Car, (car) => car.photos)
  car: Car;
}
