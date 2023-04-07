import { Injectable, Logger } from '@nestjs/common';
import { ShowtimesService } from 'src/showtimes/showtimes.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SeederService {
  constructor(
    private showtimesService: ShowtimesService,
    private bookingsService: BookingsService,
  ) {}
  private readonly logger = new Logger(SeederService.name);

  createDatetimes(times: number[], dateOffsets: number[]) {
    const date = new Date();
    let datetimes = [];
    times.forEach((time) => {
      dateOffsets.forEach((dateOffset) => {
        let datetime = new Date(date.getTime());
        datetime.setDate(date.getDate() + dateOffset);
        datetime.setHours(time, 0, 0, 0);
        datetimes.push(datetime);
      });
    });
    return datetimes;
  }

  async seedShowtimes(times: number[], dateOffsets: number[]) {
    const showtimes = this.createDatetimes(times, dateOffsets).map(
      (datetime, index) => ({
        movie_id: (index % 2) + 1,
        hall_id: 1,
        seats_count: 40,
        datetime,
      }),
    );
    return await Promise.all(
      showtimes.map(async (showtime) => {
        return await this.showtimesService.addShowtime(showtime);
      }),
    );
  }

  async seedBookings(showtime_ids: number[]) {
    const bookings = showtime_ids.map((showtime_id) => ({
      showtime_id,
      seat: Math.floor(Math.random() * 40) + 1,
      paid: true,
    }));
    return await Promise.all(
      bookings.map(async (booking) => {
        return await this.bookingsService.book(
          Math.floor(Math.random() * 2) + 1,
          booking,
        );
      }),
    );
  }

  async seed() {
    const times = [12, 18];
    const dateOffsets = [1, 2, 3, 4];
    this.logger.log('Seeding showtimes');
    const showtimes = await this.seedShowtimes(times, dateOffsets);
    const showtime_ids = showtimes.map((showtime) => showtime.id);
    this.logger.log('Seeding bookings');
    const bookings = await this.seedBookings(showtime_ids);
  }

  async check() {
    return Boolean((await this.showtimesService.getShowtimes()).length);
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async handleCron() {
    try {
      this.logger.log('Checking for upcoming showtimes');
      if (!(await this.check())) await this.seed();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
