import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDoc {
  @ApiProperty({
    example: 'Rua H',
    description: 'Street name',
  })
  street: string;

  @ApiProperty({
    example: 'Belo Horizonte',
    description: 'City name',
  })
  city: string;

  @ApiProperty({
    example: '00000-000',
    description: 'CEP',
  })
  zipCode: string;
}
