import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { TokenService } from '../token.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload)
      throw new HttpException('Invalid access token', HttpStatus.BAD_REQUEST);
    const isValid = await this.tokenService.validateAccessTokenPayload(payload);
    if (!isValid)
      throw new HttpException('Invalid access token', HttpStatus.BAD_REQUEST);
    return payload;
  }
}
