import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({
    example: '2e1cd660-0055-417a-94f7-5a3f88683574',
    description: 'Identifier of a customer',
  })
  uuid: string;

  @ApiProperty({
    example: 'Vitor',
    description: 'First name of a customer',
  })
  firstName: string;

  @ApiProperty({
    example: 'Reis',
    description: 'Last name of a customer',
  })
  lastName: string;

  @ApiProperty({
    example: 50,
    description: 'Age of a customer',
  })
  age: number;

  @ApiProperty({
    example: new Date(),
    description: 'Creation date of a customer',
  })
  createdAt: Date;
}
