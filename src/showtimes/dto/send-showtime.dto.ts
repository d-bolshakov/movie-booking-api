import { ApiProperty } from '@nestjs/swagger';

export class SendShowtimeDto {
    constructor(showtime: any) {
        this.id = showtime.id
        this.movie_id = showtime.movie_id
        this.hall_id = showtime.hall_id
        this.seats_count = showtime.seats_count
        this.datetime = showtime.datetime
    }

    @ApiProperty({example: '1', description: 'Unique identificator of a showtime'})
    id: number

    @ApiProperty({example: '1', description: 'Unique identificator of a movie'})
    movie_id: number;

    @ApiProperty({example: '1', description: 'Unique identificator of a hall'})
    hall_id: number;

    @ApiProperty({example: '40', description: 'Amount of seats available'})
    seats_count: number;

    @ApiProperty({example: '2022-06-20T12:00Z', description: 'Date and time of a showtime'})
    datetime: Date;
}