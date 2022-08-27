import { ApiProperty } from '@nestjs/swagger';


export class SendMovieDto {
    constructor(movie: any, movieGenres = undefined) {
        this.id = movie.id
        this.title = movie.title
        this.cover = movie.cover
        this.director = movie.director
        if (movieGenres) {
            movieGenres.forEach(genre => this.genres.push(genre))
        }
        else movie.genres.forEach(genre => this.genres.push(genre.title))
        this.release_date = new Date(movie.release_date)
    }

    @ApiProperty({example: '1', description: 'Unique identificator'})
    id: number

    @ApiProperty({example: 'Home Alone', description: 'Title'})
    title: string

    @ApiProperty({example: 'Home Alone', description: 'Link of the cover image'})
    cover: string

    @ApiProperty({example: 'Chris Columbus', description: 'Director`s name'})
    director: string

    @ApiProperty({example: "['comedy', 'adventure']", description: 'Genres'})
    genres = []

    @ApiProperty({example: '2022-06-12', description: 'Release date'})
    release_date: Date
}