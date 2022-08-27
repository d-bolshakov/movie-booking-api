import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from 'src/bookings/models/booking.model';
import { Movie } from 'src/movies/models/movie.model';
import { MoviesModule } from 'src/movies/movies.module';
import { Showtime } from './models/showtime.model';
import { ShowtimesController } from './showtimes.controller';
import { ShowtimesService } from './showtimes.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Showtime, Movie, Booking]),
    MoviesModule
],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
  exports: [ShowtimesService]
})
export class ShowtimesModule {}
