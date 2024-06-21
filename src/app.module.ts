import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CourseMiddleware } from './books/book.middleware';
import { BookModule } from './books/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared.module';

@Module({
  imports: [SharedModule, MongooseModule.forRoot('mongodb://localhost/nest'), BookModule],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CourseMiddleware)
      .forRoutes({ path: 'books', method: RequestMethod.POST });
}
}
