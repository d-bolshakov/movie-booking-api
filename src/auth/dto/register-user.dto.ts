import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator'

export class RegisterUserDto {
    @ApiProperty({example: 'John Doe', description: 'Username'})
    @IsString({message: 'Must be a string'})
    readonly username: string

    @ApiProperty({example: 'user@mail.com', description: 'Email'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: 'Email must be valid'})
    readonly email: string

    @ApiProperty({example: 'pass', description: 'Password'})
    @IsString({message: 'Must be a string'})
    @Length(3, 10, {message: 'Must be from 3 to 10 symbols'})
    readonly password: string
}