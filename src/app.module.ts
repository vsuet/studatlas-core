import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AcademiesModule } from './academies/academies.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { GqlConfigService } from './shared/services/gql-config.service';
import { BooksModule } from './books/books.module';
import { DivisionsModule } from './divisions/divisions.module';
import { DocumentsModule } from './documents/documents.module';
import { FacultiesModule } from './faculties/faculties.module';
import { GroupsModule } from './groups/groups.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    AuthModule,
    AcademiesModule,
    BooksModule,
    // CurriculaModule,
    DivisionsModule,
    DocumentsModule,
    FacultiesModule,
    GroupsModule,
    SpecialitiesModule,
    StatisticsModule,
  ],
})
export class AppModule {}
