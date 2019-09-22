import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AcademiesModule } from './academies/academies.module';

@Module({
  imports: [
    AcademiesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
