import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({ minimum: 1, maximum: 10, example: 5 })
  readonly rating: number;
}
