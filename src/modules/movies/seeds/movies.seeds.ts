import mongoose from 'mongoose';
import { Movie } from '../schemas/movie.schema';

export const moviesSeeds: Movie[] = [
  {
    _id: new mongoose.Types.ObjectId('649475b4f534a6a6972bc95b'),
    title: 'The Shawshank Redemption',
    description: 'American drama film directed and written by Frank Darabont',
    images: [],
    rating: 8,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'The Godfather',
    description: 'American crime drama film directed by Francis Ford Coppola',
    images: [],
    rating: 10,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'The Dark Knight',
    description:
      'Superhero action movie with elements of neo noir directed by Christopher Nolan',
    images: [],
    rating: 4,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: '12 Angry Men',
    description: 'Legal drama the directorial debut of Sidney Lumet',
    images: [],
    rating: 9,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Schindlers List',
    description: 'American epic historical drama directed by Steven Spielberg',
    images: [],
    rating: 2,
  },
];
