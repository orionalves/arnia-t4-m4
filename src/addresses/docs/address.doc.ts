import { ApiProperty } from '@nestjs/swagger';

export class AddressDoc {
  @ApiProperty({
    example: '1',
    description: 'Serial number that indentifies',
  })
  id: number;

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

  //user: User;
}
