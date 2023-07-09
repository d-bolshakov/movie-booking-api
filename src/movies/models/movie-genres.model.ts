import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Genre } from './genre.model';
import { Movie } from './movie.model';

@Table({ tableName: 'movie_genres', timestamps: false })
export class MovieGenres extends Model<MovieGenres> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  genreId: number;
}
