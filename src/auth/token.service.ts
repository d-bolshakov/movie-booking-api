import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/user.model';
import { JwtPayload, Tokens } from './types';
import { RefreshToken } from './models/refresh-token.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(RefreshToken) private tokenRepository: typeof RefreshToken,
  ) {}

  async getTokens(id: number, role: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { id, role },
        { expiresIn: '1d', secret: process.env.AT_SECRET_KEY },
      ),
      this.jwtService.signAsync(
        { id, role },
        { expiresIn: '30d', secret: process.env.RT_SECRET_KEY },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRefreshToken(
    id: number,
    rt: string,
  ): Promise<[RefreshToken, boolean]> {
    const storedrt = await this.tokenRepository.upsert({
      userId: id,
      refreshToken: rt,
    });
    return storedrt;
  }

  async validateAccessTokenPayload(payload: JwtPayload): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user)
      throw new HttpException(
        `User with id ${payload.id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    if (payload.role !== user.role)
      throw new HttpException('Invalid access token', HttpStatus.BAD_REQUEST);
    return true;
  }

  async validateRefreshTokenPayload(id: number, rt: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        `User with id ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const storedrt = await this.tokenRepository.findOne({
      where: { userId: id },
    });
    if (!storedrt || storedrt.refreshToken !== rt)
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    return true;
  }

  async removeRefreshToken(id: number): Promise<void> {
    await this.tokenRepository.destroy({
      where: {
        userId: id,
      },
    });
  }
}
