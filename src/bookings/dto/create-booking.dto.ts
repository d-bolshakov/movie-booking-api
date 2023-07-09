import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identififcator of the showtime',
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Must be a number' })
  readonly showtimeId: number;

  @ApiProperty({ example: '13', description: 'Number of the seat' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Must be a number' })
  readonly seat: number;
}
