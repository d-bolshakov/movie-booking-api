import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createDirIfNotExists(path): Promise<void> {
    try {
      await fs.access(path);
    } catch (e) {
      await fs.mkdir(path, { recursive: true });
    }
  }

  async saveMovieCover(file): Promise<string> {
    try {
      const fileName = uuid.v4() + path.parse(file.originalname).ext;
      const filePath = path.resolve(__dirname, '..', 'static', 'moviecovers');

      await this.createDirIfNotExists(filePath);
      await fs.writeFile(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        "An error occured while saving the movie's cover",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async deleteMovieCover(fileName: string): Promise<void> {
    try {
      const file = path.join(
        path.resolve(__dirname, '..', 'static', 'moviecovers'),
        fileName,
      );
      await fs.unlink(file);
    } catch (e) {
      throw new HttpException(
        'Image do not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
