import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { AddShowtimeDto, GetShowtimesFilterDto, EditShowtimeDto } from './dto';
import { Showtime } from './models/showtime.model';
import { Booking } from 'src/bookings/models/booking.model';
import { BookingsService } from 'src/bookings/bookings.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectModel(Showtime) private showtimeRepository: typeof Showtime,
    private moviesService: MoviesService,
    private bookingsService: BookingsService,
  ) {}

  async getShowtimes(dto?: GetShowtimesFilterDto): Promise<Showtime[]> {
    if (dto.endDate && dto.endDate < dto.startDate)
      throw new HttpException(
        'endDate is lower than startDate',
        HttpStatus.BAD_REQUEST,
      );
    const filteringOptions = {
      ...(dto.movieId && { movieId: dto.movieId }),
      datetime: {
        [Op.and]: {
          [Op.gte]: dto.startDate ? dto.startDate : new Date(),
          ...(dto.startDate && {
            [Op.lte]: dto.endDate
              ? dto.endDate
              : new Date(dto.startDate.getTime() + 1000 * 60 * 60 * 24),
          }),
        },
      },
    };
    const showtimes = await this.showtimeRepository.findAll({
      where: filteringOptions,
      include: {
        model: Booking,
        attributes: ['seat'],
      },
    });
    return showtimes;
  }

  async getShowtimeById(id: number): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      include: {
        model: Booking,
        attributes: ['seat'],
      },
    });
    if (!showtime)
      throw new HttpException(
        `Showtime with id ${id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    return showtime;
  }

  async getBookingsByShowtimeId(id: number): Promise<Booking[]> {
    const showtime = await this.getShowtimeById(id);
    if (!showtime)
      throw new HttpException(
        `Showtime with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    return this.bookingsService.getListByShowtimeId(id);
  }

  async addShowtime(dto: AddShowtimeDto): Promise<Showtime> {
    const movie = await this.moviesService.getMovieById(dto.movieId);
    if (!movie)
      throw new HttpException(
        `Movie with id ${dto.movieId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    if (!(await this.isHallAvailable(dto.hallId, dto.datetime)))
      throw new HttpException(
        `Hall ${dto.hallId} will not be available at ${dto.datetime}`,
        HttpStatus.BAD_REQUEST,
      );
    const showtime = await this.showtimeRepository.create({ ...dto });
    return showtime;
  }

  async editShowtime(id: number, dto: EditShowtimeDto): Promise<Showtime> {
    const showtime = await this.getShowtimeById(id);
    if (!showtime)
      throw new HttpException(
        `Showtime with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    if (dto.movieId) await this.moviesService.getMovieById(dto.movieId);
    if (dto.hallId || dto.datetime) {
      const hallId = dto.hallId ? dto.hallId : showtime.hallId;
      const datetime = dto.datetime ? dto.datetime : showtime.datetime;
      if (!(await this.isHallAvailable(hallId, datetime)))
        throw new HttpException(
          `Hall ${hallId} will not be available at ${datetime}`,
          HttpStatus.BAD_REQUEST,
        );
    }
    showtime.set(dto);
    await showtime.save();
    return showtime;
  }

  async deleteShowtime(id: number): Promise<{ message: string }> {
    const showtime = await this.getShowtimeById(id);
    if (!showtime)
      throw new HttpException(
        `Showtime with id ${id} doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    await showtime.destroy();
    return { message: 'Showtime was deleted successfully' };
  }

  async isHallAvailable(hallId: number, datetime: Date): Promise<boolean> {
    const candidate = await this.showtimeRepository.findOne({
      where: {
        datetime,
        hallId,
      },
    });
    if (candidate) return false;
    return true;
  }
}
