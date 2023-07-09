import { ApiProperty } from '@nestjs/swagger';
import { Movie } from '../models/movie.model';

export class SendMovieDto {
  constructor(movie: Movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.cover = movie.cover;
    this.genres = movie.genres.map((genre) => genre.title);
    this.director = movie.director;
    this.releaseDate = movie.releaseDate;
  }

  @ApiProperty({ example: '1', description: 'Unique identificator' })
  id: number;

  @ApiProperty({ example: 'Home Alone', description: 'Title' })
  title: string;

  @ApiProperty({
    example: 'Home Alone',
    description: 'Link of the cover image',
  })
  cover: string;

  @ApiProperty({ example: 'Chris Columbus', description: 'Director`s name' })
  director: string;

  @ApiProperty({ example: "['comedy', 'adventure']", description: 'Genres' })
  genres = [];

  @ApiProperty({ example: '2022-06-12', description: 'Release date' })
  releaseDate: Date;
}
