import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShowtimesService } from 'src/showtimes/showtimes.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './models/booking.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
    @Inject(forwardRef(() => ShowtimesService))
    private showtimesService: ShowtimesService,
  ) {}

  private readonly logger = new Logger(BookingsService.name);

  async createBooking(userId: number, dto: CreateBookingDto) {
    const candidate = await this.bookingRepository.findOne({
      where: {
        showtimeId: dto.showtimeId,
        seat: dto.seat,
      },
    });
    if (candidate)
      throw new HttpException(
        `Seat ${dto.seat} has already been booked`,
        HttpStatus.BAD_REQUEST,
      );
    const showtime = await this.showtimesService.getShowtimeById(
      dto.showtimeId,
    );
    if (
      showtime.seatsCount < dto.seat ||
      showtime.datetime < new Date() ||
      showtime.datetime.getTime() - new Date().getTime() < 15 * 60 * 1000
    )
      throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST);
    const booking = await this.bookingRepository.create({
      ...dto,
      userId,
      createdAt: new Date(),
    });
    return booking;
  }

  async cancelBooking(userId: number, bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: {
        id: bookingId,
      },
    });
    if (!booking)
      throw new HttpException('Booking is not found', HttpStatus.NOT_FOUND);
    if (booking.userId !== userId)
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    const showtime = await this.showtimesService.getShowtimeById(
      booking.showtimeId,
    );
    if (showtime.datetime < new Date())
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    booking.destroy();
    return { message: 'Booking was cancelled successfully' };
  }

  async updateStatus(id: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking)
      throw new HttpException('Booking is not found', HttpStatus.NOT_FOUND);
    if (booking.paid)
      throw new HttpException(
        'The booking is already paid',
        HttpStatus.BAD_REQUEST,
      );
    const updated = await booking.update({ paid: true });
    return updated;
  }

  async getListByUserId(userId: number) {
    const bookings = await this.bookingRepository.findAll({
      where: {
        userId: userId,
      },
    });
    return bookings;
  }

  async getListByShowtimeId(showtimeId: number) {
    const bookings = await this.bookingRepository.findAll({
      where: { showtimeId },
    });
    return bookings;
  }

  @Cron('*/15 * * * *')
  async deleteUnpaid() {
    this.logger.log('Checking for upcoming showtimes');
    const upcoming = await this.showtimesService.getShowtimes({
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 15 * 60 * 1000),
    });
    this.logger.log('Deleting unpaid bookings');
    upcoming.map(async (showtime) => {
      return await this.bookingRepository.destroy({
        where: {
          showtimeId: showtime.id,
          paid: false,
        },
      });
    });
    this.logger.log(`Deleted unpaid bookings`);
  }
}
