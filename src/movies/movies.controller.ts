import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public, Role } from 'src/common/decorators';
import { AddMovieDto } from './dto/add-movie.dto';
import { MoviesService } from './movies.service';
import { diskStorage } from 'multer'
import * as path from 'path';
import * as uuid from 'uuid';
import { AddMoviePipe } from 'src/common/pipes/add-movie.pipe';
import { SendMovieDto } from './dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {

    constructor(private moviesService: MoviesService) {}
    
    @ApiOperation({summary: 'Getting a list of movies'})
    @ApiResponse({status: 200, type: [SendMovieDto]})
    @Public()
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async getAllMovies() {
        return this.moviesService.getAllMovies()
    }

    @ApiOperation({summary: 'Getting a movie by it`s id'})
    @ApiResponse({status: 200, type: SendMovieDto})
    @Public()
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getMovieById(@Param('id') movieId: number) {
        return this.moviesService.getMovieById(movieId)
    }

    @ApiOperation({summary: 'Creating a new movie'})
    @ApiResponse({status: 200, type: SendMovieDto})
    @Post('/add')
    @HttpCode(HttpStatus.OK)
    @Role('admin')
    @UsePipes(new ValidationPipe({transform: true}))
    @UseInterceptors(FileInterceptor('cover', {
        storage: diskStorage({
            destination: './static/moviecovers',
            filename: (req, file, cb) => {
                const filename: string = uuid.v4()
                const extension = path.parse(file.originalname).ext
                return cb(null, `${filename}${extension}`)
            }
        })
    }))
    async addMovie(
        @Body(AddMoviePipe) addMovieDto: AddMovieDto,
        @UploadedFile() cover
    ) {
        return this.moviesService.addMovie(addMovieDto, cover.filename)
    }   
}
