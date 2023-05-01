import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './auth/models/refresh-token.model';
import { User } from './auth/models/user.model';
import { AtGuard } from './common/guards';
import { Genre } from './movies/models/genre.model';
import { MovieGenres } from './movies/models/movie-genres.model';
import { Movie } from './movies/models/movie.model';
import { MoviesModule } from './movies/movies.module';
import { Showtime } from './showtimes/models/showtime.model';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/models/booking.model';
import { RoleGuard } from './common/guards/role.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { SeederModule } from './seeder/seeder.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        User,
        RefreshToken,
        Movie,
        MovieGenres,
        Genre,
        Showtime,
        Booking,
      ],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    MoviesModule,
    ShowtimesModule,
    BookingsModule,
    SeederModule,
    FilesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
