import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public, Role } from 'src/common/decorators';
import { BookingsService } from './bookings.service';
import { BookDto } from './dto/book.dto';
import { SendBookingDto } from './dto/send-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Creating a new booking' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200, type: SendBookingDto })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async book(@GetCurrentUserId() userId: number, @Body() bookingDto: BookDto) {
    return this.bookingsService.book(userId, bookingDto);
  }

  @ApiOperation({ summary: 'Getting a list of bookings by user`s id' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200, type: [SendBookingDto] })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getListByUserId(@GetCurrentUserId() userId: number) {
    return this.bookingsService.getListByUserId(userId);
  }

  @ApiOperation({
    summary: 'Getting a list of bookings by showtime`s id (for admin only)',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200, type: [SendBookingDto] })
  @Get('/:showtimeId')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  async getListByShowtimeId(@Param('showtimeId') showtimeId: number) {
    return this.bookingsService.getListByShowtimeId(showtimeId);
  }

  @ApiOperation({ summary: 'Canceling a booking' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200 })
  @Get('/cancel/:id')
  @HttpCode(HttpStatus.OK)
  async cancelBooking(
    @GetCurrentUserId() userId: number,
    @Param('id') bookingId: number,
  ) {
    return this.bookingsService.cancelBooking(userId, bookingId);
  }

  @ApiOperation({ summary: 'Changing a status of the  booking' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200, type: SendBookingDto })
  @Get('/update/:id')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  async updateStatus(@Param('id') bookingId: number) {
    return this.bookingsService.updateStatus(bookingId);
  }

  @ApiOperation({ summary: 'Getting a list of booked seats by showtime id' })
  @ApiResponse({ status: 200, type: [Number] })
  @Public()
  @Get('/booked/:id')
  @HttpCode(HttpStatus.OK)
  async getBooked(@Param('id') showtimeId: number) {
    return this.bookingsService.getBooked(showtimeId);
  }
}
