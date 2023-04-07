import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Movie } from 'src/movies/models/movie.model';
import { AddShowtimeDto, GetShowtimesFilterDto, SendShowtimeDto } from './dto';
import { Showtime } from './models/showtime.model';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectModel(Showtime) private showtimeRepository: typeof Showtime,
    @InjectModel(Movie) private movieRepository: typeof Movie,
  ) {}

  async getShowtimesByDate(dto: GetShowtimesFilterDto) {
    var endDate = new Date(dto.startDate);
    endDate.setDate(endDate.getDate() + 1);
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        datetime: {
          [Op.and]: {
            [Op.gte]: dto.startDate,
            [Op.lte]: endDate,
          },
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }
  async getShowtimesByPeriod(dto: GetShowtimesFilterDto) {
    if (dto.endDate < dto.startDate) throw new HttpException(
      `endDate is lower than startDate`,
      HttpStatus.BAD_REQUEST,
    );
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        datetime: {
          [Op.and]: {
            [Op.gte]: dto.startDate,
            [Op.lte]: dto.endDate,
          },
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }
  async getShowtimesByMovie(dto: GetShowtimesFilterDto) {
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        movie_id: dto.movieId,
        datetime: {
          [Op.gte]: new Date(),
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }
  async getShowtimesByMovieAndDate(dto: GetShowtimesFilterDto) {
    var endDate = new Date(dto.startDate);
    endDate.setDate(endDate.getDate() + 1);
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        movie_id: dto.movieId,
        datetime: {
          [Op.and]: {
            [Op.gte]: dto.startDate,
            [Op.lte]: endDate,
          },
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }
  async getShowtimesByMovieAndPeriod(dto: GetShowtimesFilterDto) {
    if (dto.endDate < dto.startDate) throw new HttpException(
      `endDate is lower than startDate`,
      HttpStatus.BAD_REQUEST,
    );
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        movie_id: dto.movieId,
        datetime: {
          [Op.and]: {
            [Op.gte]: dto.startDate,
            [Op.lte]: dto.endDate,
          },
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }

  async getShowtimes() {
    const showtimes = await this.showtimeRepository.findAll({
      where: {
        datetime: {
          [Op.gte]: new Date(),
        },
      },
    });
    const showtimesDto = showtimes.map((showtime) => {
      return new SendShowtimeDto(showtime);
    });
    return showtimesDto;
  }

  async getShowtimeById(showtimeId: number) {
    const showtime = await this.showtimeRepository.findOne({
      where: {
        id: showtimeId,
      },
    });
    if (!showtime)
      throw new HttpException(
        `Showtime with id ${showtimeId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    return new SendShowtimeDto(showtime);
  }

  async addShowtime(dto: AddShowtimeDto) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: dto.movie_id,
      },
    });
    if (!movie)
      throw new HttpException(
        `Movie with id ${dto.movie_id} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    if (await this.showtimeRepository.findOne({
      where: {
        datetime: dto.datetime,
        hall_id: dto.hall_id
      }
    })) throw new HttpException(`Hall ${dto.hall_id} will not be available at ${dto.datetime}`, HttpStatus.BAD_REQUEST);
    const showtime = await this.showtimeRepository.create({ ...dto });
    return new SendShowtimeDto(showtime);
  }
}
