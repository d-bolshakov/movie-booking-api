import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AddShowtimeDto, GetShowtimesFilterDto, SendShowtimeDto } from './dto';
import { ShowtimesService } from './showtimes.service';

@ApiTags('Showtimes')
@Controller('showtimes')
export class ShowtimesController {

    constructor(private showtimesService: ShowtimesService) {}
    
    @ApiOperation({summary: 'Getting a list of movies'})
    @ApiResponse({status: 200, type: [SendShowtimeDto]})
    @Public()
    @Get('/')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({transform: true}))
    async getShowtimes(@Query() filterDto: GetShowtimesFilterDto) {
        if (Object.keys(filterDto).length) {
            if (filterDto.movieId) {
                if (filterDto.startDate && filterDto.endDate) return this.showtimesService.getShowtimesByMovieAndPeriod(filterDto)
                if (filterDto.startDate && !filterDto.endDate) return this.showtimesService.getShowtimesByMovieAndDate(filterDto)
                if (!filterDto.startDate && !filterDto.endDate) return this.showtimesService.getShowtimesByMovie(filterDto)
            } else {
                if (filterDto.startDate && filterDto.endDate) return this.showtimesService.getShowtimesByPeriod(filterDto)
                if (filterDto.startDate && !filterDto.endDate) return this.showtimesService.getShowtimesByDate(filterDto)
            }
        } else {
            return this.showtimesService.getShowtimes()
        }
    }

    @ApiOperation({summary: 'Getting a showtime by it`s id'})
    @ApiResponse({status: 200, type: SendShowtimeDto})
    @Public()
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getshowtimeById(@Param('id') showtimeId: number) {
        return this.showtimesService.getShowtimeById(showtimeId)
    }

    @ApiOperation({summary: 'Creating a new showtime'})
    @ApiResponse({status: 200, type: SendShowtimeDto})
    @Public()
    @Post('/add')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({transform: true}))
    async addShowtime(@Body() addShowtimeDto: AddShowtimeDto) {
        return this.showtimesService.addShowtime(addShowtimeDto)
    }   
}
