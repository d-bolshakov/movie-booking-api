import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshToken } from './models/refresh-token.model';
import { AtStrategy, RtStrategy } from './strategies';
import { User } from './models/user.model';
import { Booking } from 'src/bookings/models/booking.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, RefreshToken, Booking]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
