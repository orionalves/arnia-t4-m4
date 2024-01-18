import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponseDoc {
  @ApiProperty({
    type: String,
    description: 'Response for user deleted.',
    example: 'User with id: 1 removed.',
  })
  response: string;
}
