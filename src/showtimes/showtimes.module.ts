import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesModule } from 'src/movies/movies.module';
import { Showtime } from './models/showtime.model';
import { ShowtimesController } from './showtimes.controller';
import { ShowtimesService } from './showtimes.service';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Showtime]),
    MoviesModule,
    BookingsModule,
  ],
  controllers: [ShowtimesController],
  providers: [ShowtimesService],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}
