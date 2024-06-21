import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

export class CustomBadRequestException extends HttpException {
    constructor() {
      super('Criação não autorizada', HttpStatus.BAD_REQUEST);
    }
  }