import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShowtimesService } from 'src/showtimes/showtimes.service';
import { BookDto } from './dto/book.dto';
import { SendBookingDto } from './dto/send-booking.dto';
import { Booking } from './models/booking.model';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking) private bookingRepository: typeof Booking,
        private showtimesService: ShowtimesService
    ) {}

    async book(userId: number, dto: BookDto) {
        const candidate = await this.bookingRepository.findOne({
            where: {
                showtime_id: dto.showtime_id,
                seat: dto.seat
            }
        })
        if (candidate) throw new HttpException(`Seat ${dto.seat} has already been booked`, HttpStatus.BAD_REQUEST)
        const showtime = await this.showtimesService.getShowtimeById(dto.showtime_id)
        if (showtime.seats_count < dto.seat || showtime.datetime < new Date())
            throw new HttpException(`Bad request`, HttpStatus.BAD_REQUEST)
        const booking = await this.bookingRepository.create({...dto, user_id: userId, created_at: new Date()});
        return new SendBookingDto(booking)
    }

    async cancelBooking(userId, bookingId) {
        const booking = await this.bookingRepository.findOne({
            where: {
                id: bookingId
            }
        })
        if (!booking) throw new HttpException("Booking is not found", HttpStatus.NOT_FOUND)
        if (booking.user_id !== userId) throw new HttpException("Access denied", HttpStatus.FORBIDDEN)
        const showtime = await this.showtimesService.getShowtimeById(booking.showtime_id)
        if (showtime.datetime < new Date()) throw new HttpException("Access denied", HttpStatus.FORBIDDEN)
        booking.destroy()
    }

    async getBooked(showtimeId: number) {
        const bookings = await this.bookingRepository.findAll({
            where: {
                showtime_id: showtimeId
            }
        })
        if (!bookings) return []
        const booked = bookings.map(booking => { return booking.seat })
        return booked
    }

    async getListByUserId(userId: number) {
        const bookings = await this.bookingRepository.findAll({
            where: {
                user_id: userId
            }
        })
        if (bookings.length === 0) return []
        const bookingsList = bookings.map(booking => {
            return new SendBookingDto(booking)
        })
        return bookingsList
    }

}
