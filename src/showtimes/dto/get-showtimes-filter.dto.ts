import { Type } from "class-transformer"
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator'

export class GetShowtimesFilterDto {
    @ApiProperty({example: '1', description: 'Unique identificator of a movie'})
    movieId: number

    @ApiProperty({example: '2022-06-20T12:00Z', description: '"From" date and time for filtering showtimes'})
    @Type(() => Date)
    startDate: Date

    @ApiProperty({example: '2022-06-20T12:00Z', description: '"To" date and time for filtering showtimes'})
    @Type(() => Date)
    endDate: Date
}