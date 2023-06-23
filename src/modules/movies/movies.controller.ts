import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { SortMovies } from './decorators/sortMovies.decorator';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { SortMoviesDto } from './dto/sort-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'get all movies' })
  @ApiQuery({ type: SortMoviesDto })
  @ApiOkResponse({ type: [Movie] })
  @Get()
  findAll(@SortMovies() sort: SortMoviesDto) {
    return this.moviesService.findAll(sort);
  }

  @ApiOperation({ summary: 'get movie by id' })
  @ApiOkResponse({ type: Movie })
  @ApiParam({ name: 'id', example: '649475b4f534a6a6972bc95b' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({ summary: 'create new movie' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Movie })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'upload image for movie by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '649475b4f534a6a6972bc95b' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { image: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOkResponse({ type: Movie })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post(':id/upload')
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Invalid file format');
    }

    return this.moviesService.updateImages(id, image.filename);
  }

  @ApiOperation({ summary: 'update movie by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '649475b4f534a6a6972bc95b' })
  @ApiOkResponse({ type: Movie })
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiOperation({ summary: 'delete movie by id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '649475b4f534a6a6972bc95b' })
  @ApiOkResponse({ type: String })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
