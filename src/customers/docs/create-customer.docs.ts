import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDocs {
  @ApiProperty({
    example: 'Vitor',
    description: 'First name of a customer',
  })
  firstName: string;

  @ApiProperty({
    example: 'Reis',
    description: 'Last name of a customer',
    nullable: true,
  })
  lastName: string;

  @ApiProperty({
    example: 50,
    description: 'Age of a customer',
  })
  age: number;
}
