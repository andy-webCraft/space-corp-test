import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Декоратор для получения данных авторизованного пользователя */
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request['user'];
  },
);
