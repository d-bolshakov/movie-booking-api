import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditMovieDto {
  @ApiProperty({ example: 'Home Alone', description: 'Title of the movie' })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty({
    example: 'Chris Columbus',
    description: 'Name of the director',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  director: string;

  @ApiProperty({
    example: 'comedy, adventure',
    description: 'Genres of the movie',
  })
  @IsOptional()
  @Transform(({ value }) => {
    return value.split(/\s?[,]\s?/);
  })
  @IsString({ message: 'Must be a string', each: true })
  genres: string[];

  @ApiProperty({
    example: '2022-06-12',
    description: 'Release date of the movie',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Must be a date' })
  releaseDate: Date;
}
