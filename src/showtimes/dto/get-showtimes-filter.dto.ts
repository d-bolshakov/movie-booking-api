import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class GetShowtimesFilterDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identificator of a movie',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Must be a number' })
  movieId?: number;

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: '"From" date and time for filtering showtimes',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Must be a date' })
  startDate?: Date;

  @ApiProperty({
    example: '2022-06-20T12:00Z',
    description: '"To" date and time for filtering showtimes',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Must be a date' })
  endDate?: Date;
}
