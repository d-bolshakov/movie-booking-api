import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AddMoviePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.genres = JSON.parse(value.genres)
    return value
  }
}
