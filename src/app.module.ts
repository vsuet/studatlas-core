import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AcademiesModule } from './academies/academies.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    AcademiesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
