import { ApiProperty } from '@nestjs/swagger';

export class QueryCustomerDocs {
  @ApiProperty({
    example: 50,
    description: 'Age of a customer',
    nullable: true,
  })
  age: number;
}
