import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/user.model';

export class SendUserDto {
  constructor(user: User, accessToken: string) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
    this.accessToken = accessToken;
  }

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  readonly id: number;

  @ApiProperty({ example: 'John Doe', description: 'Username' })
  readonly username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'user', description: 'Role' })
  readonly role: string;

  @ApiProperty({
    example: 'ghjgh345kjhkhjk.hh45j54h45b.45dsfsjj5bh43',
    description: 'JWT access token',
  })
  readonly accessToken: string;
}
