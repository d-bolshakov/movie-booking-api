import { Module } from '@nestjs/common';
import { ShowtimesModule } from '../showtimes/showtimes.module';
import { BookingsModule } from '../bookings/bookings.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [ShowtimesModule, BookingsModule],
  providers: [SeederService],
})
export class SeederModule {}
