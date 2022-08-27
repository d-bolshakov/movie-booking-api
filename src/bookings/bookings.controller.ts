import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { BookingsService } from './bookings.service';
import { BookDto } from './dto/book.dto';
import { SendBookingDto } from './dto/send-booking.dto';

@Controller('bookings')
export class BookingsController {

    constructor(private bookingsService: BookingsService) {}
    
    @ApiOperation({summary: 'Creating a new booking'})
    @ApiResponse({status: 200, type: SendBookingDto})
    @Post('/new')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async book(@GetCurrentUserId() userId: number,
        @Body() bookingDto: BookDto) {
        return this.bookingsService.book(userId, bookingDto)
    }

    @ApiOperation({summary: 'Getting a list of bookings by user`s id'})
    @ApiResponse({status: 200, type: [SendBookingDto]})
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    async getListByUserId(@GetCurrentUserId() userId: number) {
        return this.bookingsService.getListByUserId(userId)
    }

    @ApiOperation({summary: 'Canceling a booking'})
    @ApiResponse({status: 200})
    @Get('/cancel/:id')
    @HttpCode(HttpStatus.OK)
    async cancelBooking(@GetCurrentUserId() userId: number,
        @Param('id') bookingId: number) {
        return this.bookingsService.cancelBooking(userId, bookingId)
    }

    @ApiOperation({summary: 'Getting a list of booked seats by showtime id'})
    @ApiResponse({status: 200, type: [Number]})
    @Public()
    @Get('/booked/:id')
    @HttpCode(HttpStatus.OK)
    async getBooked(@Param('id') showtimeId: number) {
        return this.bookingsService.getBooked(showtimeId)
    }

}
