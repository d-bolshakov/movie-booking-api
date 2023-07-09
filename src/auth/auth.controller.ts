import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { SendUserDto } from './dto/send-user.dto';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { Public } from '../common/decorators';
import { RtGuard } from 'src/common/guards/rt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logging in' })
  @ApiResponse({ status: 200, type: SendUserDto })
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async login(@Body() dto: LoginUserDto, @Res() res): Promise<SendUserDto> {
    const { user, refreshToken } = await this.authService.login(dto);
    res.cookie('refreshToken', refreshToken, {
      secure: false,
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 1000),
      httpOnly: true,
    });
    return res.send(user);
  }

  @ApiOperation({ summary: 'Registering a new user' })
  @ApiResponse({ status: 200, type: SendUserDto })
  @Public()
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async registration(
    @Body() dto: RegisterUserDto,
    @Res() res,
  ): Promise<SendUserDto> {
    const { user, refreshToken } = await this.authService.registration(dto);
    res.cookie('refreshToken', refreshToken, {
      secure: false,
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 1000),
      httpOnly: true,
    });
    return res.send(user);
  }

  @ApiOperation({ summary: 'Logging out' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiResponse({ status: 200 })
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() id: number): Promise<{ message: string }> {
    return this.authService.logout(id);
  }

  @ApiOperation({ summary: 'Refreshing an access token' })
  @ApiHeader({
    name: 'set-cookie',
    description: 'Cookie header with refresh-token',
  })
  @ApiResponse({ status: 200 })
  @Public()
  @UseGuards(RtGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserId() id: number,
    @Res() res,
  ): Promise<SendUserDto> {
    const data = await this.authService.refresh(id);
    res.cookie('refreshToken', data.refreshToken, {
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
    });
    return res.send(data.user);
  }
}
