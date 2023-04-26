import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public, Role } from 'src/common/decorators';
import { AddMovieDto } from './dto/add-movie.dto';
import { MoviesService } from './movies.service';
import { SendMovieDto } from './dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Getting a list of movies' })
  @ApiResponse({ status: 200, type: [SendMovieDto] })
  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @ApiOperation({ summary: 'Getting a movie by it`s id' })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMovieById(@Param('id') movieId: number) {
    return this.moviesService.getMovieById(movieId);
  }
  
  @ApiOperation({ summary: 'Creating a new movie' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiBody({
    description: 'Info about the movie and it`s cover, must be a "multipart/form-data"',
    type: AddMovieDto,
  })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @Post('/add')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  @UseInterceptors(FileInterceptor('cover'))
  async addMovie(
    @Body(new ValidationPipe({ transform: true })) addMovieDto: AddMovieDto,
    @UploadedFile() cover,
  ) {
    return this.moviesService.addMovie(addMovieDto, cover);
  }
}
