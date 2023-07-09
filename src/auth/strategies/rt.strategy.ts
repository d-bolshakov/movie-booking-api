import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../token.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['refreshToken'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      secretOrKey: process.env.RT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new HttpException('Invalid jwt token', HttpStatus.BAD_REQUEST);
    }
    const refreshToken = req?.cookies['refreshToken'];
    const isValid = await this.tokenService.validateRefreshTokenPayload(
      payload.id,
      refreshToken,
    );
    if (!isValid) {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }
    return {
      ...payload,
      refreshToken,
    };
  }
}
