import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './schemas/movie.schema';
import { DocumentNotFoundException } from '@exceptions/documentNotFound.exception';
import { moviesSeeds } from './seeds/movies.seeds';
import { SortMoviesDto } from './dto/sort-movie.dto';

@Injectable()
export class MoviesService implements OnModuleInit {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    const newMovie = await this.movieModel.create(createMovieDto);
    return newMovie;
  }

  async findAll(sort?: SortMoviesDto) {
    return this.movieModel
      .find()
      .sort({ ...sort })
      .exec();
  }

  async findOne(id: string) {
    const targetMovie = await this.movieModel.findById(id).exec();
    if (!targetMovie) {
      throw new DocumentNotFoundException('Movie', id);
    }

    return targetMovie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedMovie) {
      throw new DocumentNotFoundException('Movie', id);
    }

    return updatedMovie;
  }

  async remove(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndRemove(id).exec();
    if (!deletedMovie) {
      throw new DocumentNotFoundException('Movie', id);
    }

    return `Movie with id:${id} has been deleted`;
  }

  async updateImages(id: string, filename: string) {
    const updatedMovie = await this.movieModel
      .findByIdAndUpdate(id, { $push: { images: filename } }, { new: true })
      .exec();

    if (!updatedMovie) {
      throw new DocumentNotFoundException('Movie', id);
    }

    return updatedMovie;
  }

  async onModuleInit() {
    const countDocuments = await this.movieModel.countDocuments();
    if (!countDocuments) {
      await this.movieModel.insertMany(moviesSeeds);
    }
  }
}
