import { HttpException, HttpStatus } from '@nestjs/common';

/** Класс исключений для ненайденных документов в БД */
export class DocumentNotFoundException extends HttpException {
  constructor(name: string, id?: string) {
    super(
      `${name}${id ? ` with id: ${id}` : ''} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
