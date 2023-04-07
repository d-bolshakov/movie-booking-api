import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShowtimesService } from 'src/showtimes/showtimes.service';
import { BookDto } from './dto/book.dto';
import { SendBookingDto } from './dto/send-booking.dto';
import { Booking } from './models/booking.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
    private showtimesService: ShowtimesService,
  ) {}

  private readonly logger = new Logger(BookingsService.name);

  async book(userId: number, dto: BookDto) {
    const candidate = await this.bookingRepository.findOne({
      where: {
        showtime_id: dto.showtime_id,
        seat: dto.seat,
      },
    });
    if (candidate)
      throw new HttpException(
        `Seat ${dto.seat} has already been booked`,
        HttpStatus.BAD_REQUEST,
      );
    const showtime = await this.showtimesService.getShowtimeById(
      dto.showtime_id,
    );
    if (
      showtime.seats_count < dto.seat ||
      showtime.datetime < new Date() ||
      showtime.datetime.getTime() - new Date().getTime() < 15 * 60 * 1000
    )
      throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
    const booking = await this.bookingRepository.create({
      ...dto,
      user_id: userId,
      created_at: new Date(),
    });
    return new SendBookingDto(booking);
  }

  async cancelBooking(userId, bookingId) {
    const booking = await this.bookingRepository.findOne({
      where: {
        id: bookingId,
      },
    });
    if (!booking)
      throw new HttpException('Booking is not found', HttpStatus.NOT_FOUND);
    if (booking.user_id !== userId)
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    const showtime = await this.showtimesService.getShowtimeById(
      booking.showtime_id,
    );
    if (showtime.datetime < new Date())
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    booking.destroy();
  }

  async getBooked(showtimeId: number) {
    const bookings = await this.bookingRepository.findAll({
      where: {
        showtime_id: showtimeId,
      },
    });
    if (!bookings) return [];
    const booked = bookings.map((booking) => {
      return booking.seat;
    });
    return booked;
  }

  async updateStatus(bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: {
        id: bookingId,
      },
    });
    if (!booking)
      throw new HttpException('Booking is not found', HttpStatus.NOT_FOUND);
    if (booking.paid)
      throw new HttpException(
        'The booking is already paid',
        HttpStatus.BAD_REQUEST,
      );
    const updated = await booking.update({ paid: true });
    return new SendBookingDto(updated);
  }

  async getListByUserId(userId: number) {
    const bookings = await this.bookingRepository.findAll({
      where: {
        user_id: userId,
      },
    });
    if (bookings.length === 0) return [];
    const bookingsList = bookings.map((booking) => {
      return new SendBookingDto(booking);
    });
    return bookingsList;
  }

  async getListByShowtimeId(showtimeId: number) {
    const bookings = await this.bookingRepository.findAll({
      where: {
        showtime_id: showtimeId,
      },
    });
    if (bookings.length === 0) return [];
    const bookingsList = bookings.map((booking) => {
      return new SendBookingDto(booking);
    });
    return bookingsList;
  }

  @Cron('*/15 * * * *')
  async deleteUnpaid() {
    this.logger.log('Checking for upcoming showtimes');
    const upcoming = await this.showtimesService.getShowtimesByPeriod({
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 15 * 60 * 1000)
    });
    this.logger.log('Deleting unpaid bookings');
    const deleted = upcoming.map(async (showtime) => {
      return await this.bookingRepository.destroy({
        where: {
          showtime_id: showtime.id,
          paid: false,
        },
      });
    });
    this.logger.log(`Deleted unpaid bookings`);
  }
}
