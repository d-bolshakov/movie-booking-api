import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from 'src/bookings/models/booking.model';
import { Movie } from 'src/movies/models/movie.model';

interface ShowtimeCreationAttrs {
    movie_id: number;
    hall_id: number;
    seats_count: number;
    datetime: Date;
}

@Table({tableName: 'showtimes', timestamps: false})
export class Showtime extends Model<Showtime, ShowtimeCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ForeignKey(() => Movie)
  @Column({type: DataType.INTEGER, allowNull: false})
  movie_id: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  hall_id: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  seats_count: number;

  @Column({type: DataType.DATE, allowNull: false})
  datetime: Date;

  @BelongsTo(() => Movie)
  movie: Movie
  
  @HasMany(() => Booking)
  bookings: Booking[]
}