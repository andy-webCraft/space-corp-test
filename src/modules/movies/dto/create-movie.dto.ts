import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Fight Club' })
  readonly title: string;

  @ApiProperty({
    example:
      'American psychological thriller based on the novel of the same name by Chuck Palahniuk',
  })
  readonly description: string;

  @ApiProperty({ example: [] })
  readonly images: string[];
}
