import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { MovieGenres } from './movie-genres.model';
import { Movie } from './movie.model';

export interface GenreCreationAttrs {
  value: string;
  title: string;
}

@Table({ tableName: 'genres', timestamps: false })
export class Genre extends Model<Genre, GenreCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @BelongsToMany(() => Movie, () => MovieGenres)
  movies: Movie[];
}
