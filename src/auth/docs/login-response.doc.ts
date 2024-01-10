import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDoc {
  @ApiProperty({
    type: String,
    description: 'A token for user authentication.',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlZHVzeW5jIiwic3ViIjoiYXV0aCIsImF1ZCI6InVzZXJzIiwiaWQiOjEsImVtYWlsIjoibHVpemFkbUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDQ5MjcwNTgsImV4cCI6MTcwNDkyNzY1OH0.Zdmm8cQ-UMrAQiegp59HVqV295iTpTxDNfpKuDO_lYc',
  })
  token: string;
}
