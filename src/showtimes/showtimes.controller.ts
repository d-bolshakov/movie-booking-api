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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public, Role } from 'src/common/decorators';
import { AddShowtimeDto, GetShowtimesFilterDto, SendShowtimeDto } from './dto';
import { ShowtimesService } from './showtimes.service';
import { EditShowtimeDto } from './dto';
import { SendBookingDto } from 'src/bookings/dto/send-booking.dto';

@ApiTags('Showtimes')
@Controller('showtimes')
export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  @ApiOperation({ summary: 'Getting a list of showtimes' })
  @ApiResponse({ status: 200, type: [SendShowtimeDto] })
  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getShowtimesFiltered(
    @Query(new ValidationPipe({ transform: true }))
    filterDto: GetShowtimesFilterDto,
  ): Promise<SendShowtimeDto[]> {
    const showtimes = await this.showtimesService.getShowtimes(filterDto);
    if (!showtimes.length) return [];
    return showtimes.map((showtime) => new SendShowtimeDto(showtime));
  }

  @ApiOperation({ summary: "Getting a showtime by it's id" })
  @ApiResponse({ status: 200, type: SendShowtimeDto })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the showtime' })
  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getShowtimeById(@Param('id') id: number): Promise<SendShowtimeDto> {
    const showtime = await this.showtimesService.getShowtimeById(id);
    return new SendShowtimeDto(showtime);
  }

  @ApiOperation({ summary: "Getting a list of bookings by showtime's id" })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the showtime' })
  @ApiResponse({ status: 200, type: [SendBookingDto] })
  @Role('admin')
  @Get('/:id/bookings')
  @HttpCode(HttpStatus.OK)
  async getBookingsByShowtimeId(
    @Param('id') id: number,
  ): Promise<SendBookingDto[]> {
    const bookings = await this.showtimesService.getBookingsByShowtimeId(id);
    if (!bookings.length) return [];
    return bookings.map((booking) => new SendBookingDto(booking));
  }

  @ApiOperation({ summary: 'Creating a new showtime' })
  @ApiResponse({ status: 200, type: SendShowtimeDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @Role('admin')
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async addShowtime(
    @Body(new ValidationPipe({ transform: true }))
    addShowtimeDto: AddShowtimeDto,
  ): Promise<SendShowtimeDto> {
    const showtime = await this.showtimesService.addShowtime(addShowtimeDto);
    return new SendShowtimeDto(showtime);
  }

  @ApiOperation({ summary: 'Editing a showtime' })
  @ApiResponse({ status: 200, type: SendShowtimeDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the showtime' })
  @Role('admin')
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async editShowtime(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    editShowtimeDto: EditShowtimeDto,
  ): Promise<SendShowtimeDto> {
    const showtime = await this.showtimesService.editShowtime(
      id,
      editShowtimeDto,
    );
    return new SendShowtimeDto(showtime);
  }

  @ApiOperation({ summary: 'Deleting a showtime' })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the showtime' })
  @ApiResponse({ status: 200 })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @Role('admin')
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteShowtime(@Param('id') id: number): Promise<{ message: string }> {
    return this.showtimesService.deleteShowtime(id);
  }
}
