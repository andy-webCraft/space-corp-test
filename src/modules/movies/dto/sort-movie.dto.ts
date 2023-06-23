import { ApiProperty } from '@nestjs/swagger';

/** Перечисление допустимых значений сортировки */
export enum sortValueEnum {
  asc = 'asc',
  desc = 'desc',
}
export class SortMoviesDto {
  @ApiProperty({ enum: sortValueEnum, required: false })
  readonly title?: sortValueEnum;

  @ApiProperty({ enum: sortValueEnum, required: false })
  readonly description?: sortValueEnum;

  @ApiProperty({ enum: sortValueEnum, required: false })
  readonly rating?: sortValueEnum;
}
