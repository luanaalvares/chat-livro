import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  nome: string;

  @Prop()
  autor: string;

  @Prop()
  isbn: number;

}

export const BookSchema = SchemaFactory.createForClass(Book);