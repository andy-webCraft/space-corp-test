import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

/** Фильтр для обработки исключений mongoose */
@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
