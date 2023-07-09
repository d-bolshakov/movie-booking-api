import { Injectable, Logger } from '@nestjs/common';
import { ShowtimesService } from 'src/showtimes/showtimes.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Showtime } from 'src/showtimes/models/showtime.model';
import { Booking } from 'src/bookings/models/booking.model';

@Injectable()
export class SeederService {
  constructor(
    private showtimesService: ShowtimesService,
    private bookingsService: BookingsService,
  ) {}
  private readonly logger = new Logger(SeederService.name);

  createDatetimes(times: number[], dateOffsets: number[]): Date[] {
    const date = new Date();
    const datetimes = [];
    times.forEach((time) => {
      dateOffsets.forEach((dateOffset) => {
        const datetime = new Date(date.getTime());
        datetime.setDate(date.getDate() + dateOffset);
        datetime.setHours(time, 0, 0, 0);
        datetimes.push(datetime);
      });
    });
    return datetimes;
  }

  async seedShowtimes(
    times: number[],
    dateOffsets: number[],
  ): Promise<Showtime[]> {
    const showtimes = this.createDatetimes(times, dateOffsets).map(
      (datetime, index) => ({
        movieId: (index % 2) + 1,
        hallId: 1,
        seatsCount: 40,
        datetime,
      }),
    );
    return await Promise.all(
      showtimes.map(async (showtime) => {
        return await this.showtimesService.addShowtime(showtime);
      }),
    );
  }

  async seedBookings(showtimeIds: number[]): Promise<Booking[]> {
    const bookings = showtimeIds.map((showtimeId) => ({
      showtimeId,
      seat: Math.floor(Math.random() * 40) + 1,
      paid: true,
    }));
    return await Promise.all(
      bookings.map(async (booking) => {
        return await this.bookingsService.createBooking(
          Math.floor(Math.random() * 2) + 1,
          booking,
        );
      }),
    );
  }

  async seed(): Promise<void> {
    const times = [12, 18];
    const dateOffsets = [1, 2, 3, 4];
    this.logger.log('Seeding showtimes');
    const showtimes = await this.seedShowtimes(times, dateOffsets);
    const showtimeIds = showtimes.map((showtime) => showtime.id);
    this.logger.log('Seeding bookings');
    await this.seedBookings(showtimeIds);
  }

  async check(): Promise<boolean> {
    return Boolean((await this.showtimesService.getShowtimes()).length);
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async handleCron(): Promise<void> {
    try {
      this.logger.log('Checking for upcoming showtimes');
      if (!(await this.check())) await this.seed();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
