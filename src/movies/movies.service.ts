import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EditMovieDto } from './dto';
import { AddMovieDto } from './dto/add-movie.dto';
import { Genre } from './models/genre.model';
import { Movie } from './models/movie.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private movieRepository: typeof Movie,
    @InjectModel(Genre) private genreRepository: typeof Genre,
    private filesService: FilesService,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll({ include: [Genre] });
    return movies;
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      include: Genre,
    });
    if (!movie)
      throw new HttpException(
        `Movie with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    return movie;
  }

  async addMovie(dto: AddMovieDto, movieCover: any): Promise<Movie> {
    const cover = await this.filesService.saveMovieCover(movieCover);
    const genres = await this.saveGenres(dto.genres);
    const movie = await this.movieRepository.create({
      ...dto,
      cover,
      genres: [],
    });
    await movie.$set('genres', genres);
    return movie.reload({ include: Genre });
  }

  async editMovie(
    id: number,
    dto: EditMovieDto,
    newMovieCover: any,
  ): Promise<Movie> {
    const movie = await this.getMovieById(id);
    if (!movie)
      throw new HttpException(
        `Movie with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    await movie.update({
      ...(dto.title && { title: dto.title }),
      ...(dto.director && { director: dto.director }),
      ...(dto.releaseDate && { releaseDate: dto.releaseDate }),
      ...(newMovieCover && {
        cover: await this.updateCover(movie.cover, newMovieCover),
      }),
    });
    if (dto.genres) {
      const genres = await this.saveGenres(dto.genres);
      await movie.$set('genres', genres);
    }
    return movie.reload({ include: Genre });
  }

  async deleteMovie(id: number): Promise<{ message: string }> {
    const movie = await this.getMovieById(id);
    if (!movie)
      throw new HttpException(
        `Movie with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    await this.filesService.deleteMovieCover(movie.cover);
    await movie.destroy();
    return { message: 'Movie was deleted successfully' };
  }

  async saveGenres(genres: any[]): Promise<Genre[]> {
    return Promise.all(
      genres.map(async (genre) => {
        let createdGenre = await this.findGenre(genre);
        if (!createdGenre) createdGenre = await this.createGenre(genre);
        return createdGenre;
      }),
    );
  }

  async findGenre(genre: string): Promise<Genre> {
    return this.genreRepository.findOne({
      where: {
        value: genre.toLowerCase(),
      },
    });
  }

  async createGenre(genre: string): Promise<Genre> {
    return this.genreRepository.create({
      value: genre.toLowerCase(),
      title: genre.charAt(0).toUpperCase() + genre.slice(1),
    });
  }

  async updateCover(prevCover: string, newCover: string): Promise<string> {
    await this.filesService.deleteMovieCover(prevCover);
    return this.filesService.saveMovieCover(newCover);
  }
}
