import { ApiProperty } from '@nestjs/swagger';

export class SendBookingDto {
  constructor(booking: any) {
    this.id = booking.id;
    this.user_id = booking.user_id;
    this.showtime_id = booking.showtime_id;
    this.seat = booking.seat;
    this.bookedAt = booking.created_at;
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
  readonly user_id: number;

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the showtime',
  })
  readonly showtime_id: number;

  @ApiProperty({ example: '13', description: 'Number of the booked seat' })
  readonly seat: number;

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: 'Date and time of creating the booking',
  })
  readonly bookedAt: Date;

  @ApiProperty({ example: 'false', description: 'Status of the booking' })
  readonly paid: Boolean;
}
