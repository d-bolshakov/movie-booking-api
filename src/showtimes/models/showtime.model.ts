import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/models/booking.model';
import { Movie } from 'src/movies/models/movie.model';

interface ShowtimeCreationAttrs {
  movieId: number;
  hallId: number;
  seatsCount: number;
  datetime: Date;
}

@Table({ tableName: 'showtimes', timestamps: false })
export class Showtime extends Model<Showtime, ShowtimeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.INTEGER, allowNull: false })
  movieId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  hallId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  seatsCount: number;

  @Column({ type: DataType.DATE, allowNull: false })
  datetime: Date;

  @BelongsTo(() => Movie)
  movie: Movie;

  @HasMany(() => Booking, { onDelete: 'CASCADE', hooks: true })
  bookings: Booking[];
}
