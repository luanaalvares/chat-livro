import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [SharedModule, MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])]
})

export class BookModule { }