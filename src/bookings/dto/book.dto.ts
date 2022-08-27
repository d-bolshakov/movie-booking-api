import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'

export class BookDto {
    @ApiProperty({example: '1', description: 'Unique identififcator of the showtime'})
    @IsNumber({}, {message: 'Must be a number'})
    readonly showtime_id: number

    @ApiProperty({example: '13', description: 'Number of the seat'})
    @IsNumber({}, {message: 'Must be a number'})
    readonly seat: number
}