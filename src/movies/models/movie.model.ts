import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Showtime } from 'src/showtimes/models/showtime.model';
import { Genre } from './genre.model';
import { MovieGenres } from './movie-genres.model';

interface MovieCreationAttrs {
  title: string;
  cover: string;
  director: string;
  releaseDate: Date;
  genres?: any;
}

@Table({ tableName: 'movies', timestamps: false })
export class Movie extends Model<Movie, MovieCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  cover: string;

  @Column({ type: DataType.STRING, allowNull: false })
  director: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  releaseDate: Date;

  @BelongsToMany(() => Genre, () => MovieGenres)
  genres: Genre[];

  @HasMany(() => Showtime, { onDelete: 'CASCADE', hooks: true })
  showtimes: Showtime[];
}
