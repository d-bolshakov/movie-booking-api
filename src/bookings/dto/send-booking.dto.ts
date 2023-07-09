import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../models/booking.model';

export class SendBookingDto {
  constructor(booking: Booking) {
    this.id = booking.id;
    this.userId = booking.userId;
    this.showtimeId = booking.showtimeId;
    this.seat = booking.seat;
    this.bookedAt = booking.createdAt;
    this.paid = booking.paid;
  }

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the booking',
  })
  readonly id: number;

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the user',
  })
  readonly userId: number;

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the showtime',
  })
  readonly showtimeId: number;

  @ApiProperty({ example: '13', description: 'Number of the booked seat' })
  readonly seat: number;

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: 'Date and time of creating the booking',
  })
  readonly bookedAt: Date;

  @ApiProperty({ example: 'false', description: 'Status of the booking' })
  readonly paid: boolean;
}
