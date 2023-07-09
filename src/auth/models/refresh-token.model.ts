import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

interface RefreshTokenCreationAttrs {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'refreshTokens', timestamps: false })
export class RefreshToken extends Model<
  RefreshToken,
  RefreshTokenCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  refreshToken: string;

  @BelongsTo(() => User)
  user: User;
}
