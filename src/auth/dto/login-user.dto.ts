import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator'

export class LoginUserDto {
    @ApiProperty({example: 'user@mail.com', description: 'Email'})
    @IsString({message: 'Must be a string'})
    readonly email: string

    @ApiProperty({example: 'pass', description: 'Password'})
    @IsString({message: 'Must be a string'})
    @Length(3, 10, {message: 'Must be from 3 to 10 symbols'})
    readonly password: string
}