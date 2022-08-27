import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/auth/models/user.model';
import { Showtime } from 'src/showtimes/models/showtime.model';

interface BookingCreationAttrs {
    showtime_id: number
    user_id: number
    seat: number
    created_at: Date
}

@Table({tableName: 'bookings', timestamps: false})
export class Booking extends Model<Booking, BookingCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  
  @ForeignKey(() => Showtime)
  @Column({type: DataType.INTEGER, allowNull: false})
  showtime_id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  seat: number;

  @Column({type: DataType.DATE, allowNull: false})
  created_at: Date;

  @BelongsTo(() => Showtime)
  showtime: Showtime

  @BelongsTo(() => User)
  user: User
}