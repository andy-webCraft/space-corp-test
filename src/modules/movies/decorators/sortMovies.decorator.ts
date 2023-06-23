import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { sortValueEnum } from '../dto/sort-movie.dto';

/** Декоратор для получения и фильтрации параметров сортировки */
export const SortMovies = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const queries = ctx.switchToHttp().getRequest().query;
    if (JSON.stringify(queries) === '{}') return;

    for (const key in queries) {
      if (!(queries[key] in sortValueEnum)) {
        delete queries[key];
      }
    }

    return queries;
  },
);
