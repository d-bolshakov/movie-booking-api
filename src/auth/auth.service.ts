import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { SendUserDto } from './dto/send-user.dto';
import { User } from './models/user.model';
import { Tokens } from './types';
import { RefreshToken } from './models/refresh-token.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(RefreshToken) private tokenRepository: typeof RefreshToken,
  ) {}

  async getTokens(userId: number, userRole: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          role: userRole,
        },
        {
          expiresIn: 60 * 15,
          secret: process.env.AT_SECRET_KEY,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          role: userRole,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: process.env.RT_SECRET_KEY,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async registration(dto: RegisterUserDto): Promise<SendUserDto> {
    const candidate = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (candidate) {
      throw new HttpException(
        `User with ${dto.email} email already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcryptjs.hash(dto.password, 3);
    const createdUser = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(createdUser.id, createdUser.role);
    await this.updateRefreshToken(createdUser.id, tokens.refresh_token);

    const userDto = new SendUserDto(createdUser, tokens);
    return userDto;
  }

  async login(dto: LoginUserDto): Promise<SendUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new HttpException(
        `User with ${dto.email} email not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const isPassValid = bcryptjs.compareSync(dto.password, user.password);
    if (!isPassValid)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const tokens = await this.getTokens(user.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    const userDto = new SendUserDto(user, tokens);
    return userDto;
  }

  async logout(userId: number) {
    await this.tokenRepository.destroy({
      where: {
        user_id: userId,
      },
    });
  }

  async refresh(userId: number, rt: string): Promise<SendUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new HttpException(
        `User with id ${userId} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const storedrt = await await this.tokenRepository.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!storedrt)
      throw new HttpException(
        `User with id ${userId} does not have a refresh token`,
        HttpStatus.BAD_REQUEST,
      );
    if (storedrt.refresh_token !== rt)
      throw new HttpException(`Invalid refresh token`, HttpStatus.BAD_REQUEST);
    const tokens = await this.getTokens(user.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    const userDto = new SendUserDto(user, tokens);
    return userDto;
  }

  async updateRefreshToken(userId: number, rt: string) {
    const storedrt = await this.tokenRepository.upsert({
      user_id: userId,
      refresh_token: rt,
    });
    return storedrt;
  }
}
