import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class AddMovieDto {
  @ApiProperty({ example: 'Home Alone', description: 'Title of the movie'})
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty({
    example: 'Chris Columbus',
    description: 'Name of the director',
  })
  @IsString({ message: 'Must be a string' })
  director: string;

  @ApiProperty({
    example: 'comedy, adventure',
    description: 'Genres of the movie',
  })
  @Transform(({value}) => {
    return value.split(/\s?[,]\s?/)
  })
  @IsString({ message: 'Must be a string', each: true })
  genres: [string];

  @ApiProperty({
    example: '2022-06-12',
    description: 'Release date of the movie',
  })
  @Type(() => Date)
  @IsDate({ message: 'Must be a date' })
  release_date: Date;
}
