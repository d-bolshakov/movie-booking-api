import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { MovieGenres } from './models/movie-genres.model';
import { Movie } from './models/movie.model';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie, Genre, MovieGenres]),
    FilesModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
