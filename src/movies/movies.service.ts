import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SendMovieDto } from './dto';
import { AddMovieDto } from './dto/add-movie.dto';
import { Genre } from './models/genre.model';
import { Movie } from './models/movie.model';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie) private movieRepository: typeof Movie,
        @InjectModel(Genre) private genreRepository: typeof Genre
    ) {}

    async getAllMovies() {
        const movies = await this.movieRepository.findAll({include: [Genre]})
        const moviesDto = movies.map(movie => {
            return new SendMovieDto(movie)
        })
        return moviesDto
    }

    async getMovieById(movieId: number) {
        const movie = await this.movieRepository.findOne({
            where: {
                id: movieId
            },
            include: Genre
        })
        return new SendMovieDto(movie)
    }

    async addMovie(dto: AddMovieDto, movieCover: any) {
        const movie = await this.movieRepository.create({...dto, cover: movieCover, genres: []});
        dto.genres.map(async genre => {
            let createdGenre = await this.findGenre(genre)
            if (!createdGenre) createdGenre = await this.createGenre(genre)
            movie.$add('genres', createdGenre.id)
        })
        return new SendMovieDto(movie, dto.genres)  
    }

    async findGenre(genre: string) {
        return await this.genreRepository.findOne({
            where: {
                value: genre.toLowerCase()
            }
        })
    }

    async createGenre(genre: string) {
        return await this.genreRepository.create({
            value: genre.toLowerCase(),
            title: genre.charAt(0).toUpperCase() + genre.slice(1)
        })
    }

}
