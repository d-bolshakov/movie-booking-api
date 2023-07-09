import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/auth/models/user.model';
import { Showtime } from 'src/showtimes/models/showtime.model';

interface BookingCreationAttrs {
  showtimeId: number;
  userId: number;
  seat: number;
  createdAt: Date;
  paid: boolean;
}

@Table({ tableName: 'bookings', timestamps: false })
export class Booking extends Model<Booking, BookingCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Showtime)
  @Column({ type: DataType.INTEGER, allowNull: false })
  showtimeId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  seat: number;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  paid: boolean;

  @BelongsTo(() => Showtime)
  showtime: Showtime;

  @BelongsTo(() => User)
  user: User;
}
