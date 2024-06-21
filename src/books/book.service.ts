import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BookService {
  findOne(username: string) {
    throw new Error('Method not implemented.');
  };
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Book.name) private booksModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }


  findOneById(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async delete(id): Promise<Book> {
    return await this.bookModel.findOneAndDelete(id);
  }

  async update(updateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(updateBookDto.id, updateBookDto, { new: true });
  }

} 