import { ApiProperty } from '@nestjs/swagger';
import { Showtime } from '../models/showtime.model';

export class SendShowtimeDto {
  constructor(showtime: Showtime) {
    this.id = showtime.id;
    this.movieId = showtime.movieId;
    this.hallId = showtime.hallId;
    this.seatsCount = showtime.seatsCount;
    this.datetime = showtime.datetime;
    this.bookedSeats = showtime.bookings
      ? showtime.bookings.map((booking) => booking.seat)
      : [];
  }

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of a showtime',
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Unique identificator of a movie' })
  movieId: number;

  @ApiProperty({ example: '1', description: 'Unique identificator of a hall' })
  hallId: number;

  @ApiProperty({ example: '40', description: 'Amount of seats available' })
  seatsCount: number;

  bookedSeats: number[];

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: 'Date and time of a showtime',
  })
  datetime: Date;
}
