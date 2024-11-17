import { ApiProperty } from '@nestjs/swagger';

export class UserDocs {
  @ApiProperty({ description: 'The ID of the user' })
  id: number;

  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The permission ID of the user' })
  permissionId: number;
}
