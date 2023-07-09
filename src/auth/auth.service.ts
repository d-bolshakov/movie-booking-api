import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { SendUserDto } from './dto/send-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async registration(
    dto: RegisterUserDto,
  ): Promise<{ user: SendUserDto; refreshToken: string }> {
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

    const tokens = await this.tokenService.getTokens(
      createdUser.id,
      createdUser.role,
    );
    await this.tokenService.updateRefreshToken(
      createdUser.id,
      tokens.refreshToken,
    );
    return {
      user: new SendUserDto(createdUser, tokens.accessToken),
      refreshToken: tokens.refreshToken,
    };
  }

  async login(
    dto: LoginUserDto,
  ): Promise<{ user: SendUserDto; refreshToken: string }> {
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

    const tokens = await this.tokenService.getTokens(user.id, user.role);
    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      user: new SendUserDto(user, tokens.accessToken),
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(id: number): Promise<{ message: string }> {
    await this.tokenService.removeRefreshToken(id);
    return { message: 'Logged out successfully' };
  }

  async refresh(
    id: number,
  ): Promise<{ user: SendUserDto; refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        `User with id ${id} not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const tokens = await this.tokenService.getTokens(user.id, user.role);
    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      user: new SendUserDto(user, tokens.accessToken),
      refreshToken: tokens.refreshToken,
    };
  }
}
