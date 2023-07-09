import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public, Role } from 'src/common/decorators';
import { AddMovieDto } from './dto/add-movie.dto';
import { MoviesService } from './movies.service';
import { EditMovieDto, SendMovieDto } from './dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Getting a list of movies' })
  @ApiResponse({ status: 200, type: [SendMovieDto] })
  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllMovies(): Promise<SendMovieDto[]> {
    const movies = await this.moviesService.getAllMovies();
    if (!movies.length) return [];
    return movies.map((movie) => new SendMovieDto(movie));
  }

  @ApiOperation({ summary: 'Getting a movie by it`s id' })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the movie' })
  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getMovieById(@Param('id') id: number): Promise<SendMovieDto> {
    const movie = await this.moviesService.getMovieById(id);
    return new SendMovieDto(movie);
  }

  @ApiOperation({ summary: 'Creating a new movie' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiBody({
    description:
      'Info about the movie and it`s cover, must be a "multipart/form-data"',
    type: AddMovieDto,
  })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  @UseInterceptors(FileInterceptor('cover'))
  async addMovie(
    @Body(new ValidationPipe({ transform: true })) addMovieDto: AddMovieDto,
    @UploadedFile() cover,
  ): Promise<SendMovieDto> {
    const movie = await this.moviesService.addMovie(addMovieDto, cover);
    return new SendMovieDto(movie);
  }

  @ApiOperation({ summary: 'Editing a movie' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiBody({
    description:
      'Info about the movie and it`s cover, must be a "multipart/form-data"',
    type: AddMovieDto,
  })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the movie' })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  @UseInterceptors(FileInterceptor('cover'))
  async editMovie(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true })) editMovieDto: EditMovieDto,
    @UploadedFile() cover,
  ): Promise<SendMovieDto> {
    const movie = await this.moviesService.editMovie(id, editMovieDto, cover);
    return new SendMovieDto(movie);
  }

  @ApiOperation({ summary: 'Deleting a movie' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization header with Bearer access-token',
  })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the movie' })
  @ApiResponse({ status: 200, type: SendMovieDto })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Role('admin')
  async deleteMovie(@Param('id') id: number): Promise<{ message: string }> {
    return this.moviesService.deleteMovie(id);
  }
}
