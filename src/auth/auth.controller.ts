import { Body, Controller, HttpCode, HttpStatus, Post,  UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { SendUserDto } from './dto/send-user.dto';
import { RtGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { Public } from '../common/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Logging in'})
    @ApiResponse({status: 200, type: SendUserDto})
    @Public()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Registering a new user'})
    @ApiResponse({status: 200, type: SendUserDto})
    @Public()
    @Post('/registration')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async registration(@Body() userDto: RegisterUserDto): Promise<SendUserDto> {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Logging out'})
    @ApiResponse({status: 200})
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId)
    }

    @ApiOperation({summary: 'Refreshing an access token'})
    @ApiResponse({status: 200, type: SendUserDto})
    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@GetCurrentUserId() userId: number, 
        @GetCurrentUser('refreshToken') refreshToken: string
    ) {
        return this.authService.refresh(userId, refreshToken)
    }
}
