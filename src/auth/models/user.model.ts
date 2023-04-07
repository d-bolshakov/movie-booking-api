import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Booking } from 'src/bookings/models/booking.model';
import { RefreshToken } from './refresh-token.model';

interface UserCreationAttrs {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role: string;

  @HasMany(() => Booking)
  bookings: Booking[];

  @HasOne(() => RefreshToken)
  refresh_token: RefreshToken;
}
