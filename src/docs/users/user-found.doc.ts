import { ApiProperty } from '@nestjs/swagger';
import { UserCreatedDoc } from './user-created.doc';

export class UserFoundDoc extends UserCreatedDoc {
  @ApiProperty({
    writeOnly: true,
  })
  password: string;
}
