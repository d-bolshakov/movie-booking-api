import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserId, Role } from 'src/common/decorators';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
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
  async createBooking(
    @GetCurrentUserId() id: number,
    @Body(new ValidationPipe({ transform: true })) bookingDto: CreateBookingDto,
  ) {
    const booking = await this.bookingsService.createBooking(id, bookingDto);
    return new SendBookingDto(booking);
  }

  @ApiOperation({ summary: "Getting a list of bookings by user's id" })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200, type: [SendBookingDto] })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getListByUserId(@GetCurrentUserId() id: number) {
    const bookings = await this.bookingsService.getListByUserId(id);
    if (!bookings.length) return [];
    return bookings.map((booking) => new SendBookingDto(booking));
  }

  @ApiOperation({ summary: 'Canceling a booking' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the booking' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
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
  @ApiParam({ name: 'id', type: Number, description: 'Id of the booking' })
  @ApiResponse({ status: 200, type: SendBookingDto })
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  async updateStatus(@Param('id') id: number) {
    const booking = await this.bookingsService.updateStatus(id);
    return new SendBookingDto(booking);
  }
}
