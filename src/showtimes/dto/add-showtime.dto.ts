import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';

export class AddShowtimeDto {

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the movie',
  })
  @IsNumber({}, { message: 'Must be a number' })
  movie_id: number;

  @ApiProperty({
    example: '1',
    description: 'Unique identificator of the hall',
  })
  @IsNumber({}, { message: 'Must be a number' })
  hall_id: number;

  @ApiProperty({ example: '40', description: 'Amount of seats available' })
  @IsNumber({}, { message: 'Must be a number' })
  seats_count: number;

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: 'Date and time of the showtime',
  })
  @Type(() => Date)
  @IsDate({ message: 'Must be a date' })
  datetime: Date;
}
