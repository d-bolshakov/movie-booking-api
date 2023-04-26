import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SendMovieDto } from './dto';
import { AddMovieDto } from './dto/add-movie.dto';
import { Genre } from './models/genre.model';
import { Movie } from './models/movie.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private movieRepository: typeof Movie,
    @InjectModel(Genre) private genreRepository: typeof Genre,
    private filesService: FilesService
  ) {}

  async getAllMovies() {
    const movies = await this.movieRepository.findAll({ include: [Genre] });
    const moviesDto = movies.map((movie) => {
      return new SendMovieDto(movie);
    });
    return moviesDto;
  }

  async getMovieById(movieId: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
      include: Genre,
    });
    return new SendMovieDto(movie);
  }

  async addMovie(dto: AddMovieDto, movieCover: any) {
    const fileName = await this.filesService.saveMovieCover(movieCover)
    const movie = await this.movieRepository.create({
      ...dto,
      cover: fileName,
      genres: [],
    });
    dto.genres.map(async (genre) => {
      let createdGenre = await this.findGenre(genre);
      if (!createdGenre) createdGenre = await this.createGenre(genre);
      movie.$add('genres', createdGenre.id);
    });
    return new SendMovieDto(movie, dto.genres);
  }

  async findGenre(genre: string) {
    return await this.genreRepository.findOne({
      where: {
        value: genre.toLowerCase(),
      },
    });
  }

  async createGenre(genre: string) {
    return await this.genreRepository.create({
      value: genre.toLowerCase(),
      title: genre.charAt(0).toUpperCase() + genre.slice(1),
    });
  }
}
