import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademiesModule } from './academies/academies.module';
import { GraphQLModule } from '@nestjs/graphql';
import { FacultiesModule } from './faculties/faculties.module';
import { GrabberModule } from './grabber/grabber.module';

@Module({
  imports: [AcademiesModule, GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    debug: true,
  }), FacultiesModule, GrabberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
