import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowtimesModule } from 'src/showtimes/showtimes.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './models/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking]),
    forwardRef(() => ShowtimesModule),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
