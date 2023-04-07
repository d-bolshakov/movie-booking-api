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
  user_id: number;
  refresh_token: string;
}

@Table({ tableName: 'refresh_tokens', timestamps: false })
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
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  refresh_token: string;

  @BelongsTo(() => User)
  user: User;
}
