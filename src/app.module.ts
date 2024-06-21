import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CourseMiddleware } from './cursos/cursos.middleware';
import { CursoModule } from './cursos/cursos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/27017'), CursoModule],
  providers: [AppGateway]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CourseMiddleware)
      .forRoutes({ path: 'curso', method: RequestMethod.POST });
}
}
