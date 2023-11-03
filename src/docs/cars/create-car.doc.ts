import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDoc {
  @ApiProperty({
    example: 'Fusca',
    description: 'Cars name',
  })
  name: string;

  @ApiProperty({
    example: 'Black',
    description: 'Cars color',
  })
  color: string;
}
