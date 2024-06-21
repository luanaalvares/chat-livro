import { Controller, Get, Post, Body, ForbiddenException, Param, Delete, Put, Patch, UseGuards, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { UpdateBookDto } from './update-book.dto';
import { BooksException } from './book.exception';
import { AppGateway } from 'src/app/app.gateway';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService, private appGateway: AppGateway) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    if(createBookDto.nome === 'Book de fogo')
      throw new BooksException()
    let book = await this.bookService.create(createBookDto);
    this.appGateway.handleBook(book)
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOneById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.delete(id);
  }

  @Put()
  async update(@Body() UpdateBookDto: UpdateBookDto) {
    if(UpdateBookDto.isbn === 0)
      throw new BadRequestException('Valor do livro não pode ser 0');
    return await this.bookService.update(UpdateBookDto);
  }

}