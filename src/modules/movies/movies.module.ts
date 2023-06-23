import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { uploadConfig } from '@config/upload.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MulterModule.register(uploadConfig),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
