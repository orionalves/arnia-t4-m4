import { IsDateString } from 'class-validator';

export class UpdateDateEvent {
  @IsDateString()
  eventDate: Date;
}
