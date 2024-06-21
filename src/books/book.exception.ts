import { HttpException, HttpStatus } from "@nestjs/common";

export class BooksException extends HttpException {
    constructor() {
      super('Nome proibido', HttpStatus.FORBIDDEN);
    }
  }