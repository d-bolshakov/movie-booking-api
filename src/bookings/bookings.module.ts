import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowtimesModule } from 'src/showtimes/showtimes.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './models/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking]),
    ShowtimesModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
