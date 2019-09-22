import { Module } from '@nestjs/common';
import { AcademiesResolver } from './academies.resolver';
import { AcademiesService } from './academies.service';
import { FacultiesModule } from '../faculties/faculties.module';
import { GroupsModule } from '../groups/groups.module';
import { SpecialitiesModule } from '../specialities/specialities.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    BooksModule,
    DivisionsModule,
    FacultiesModule,
    GroupsModule,
    SpecialitiesModule,
  ],
  providers: [AcademiesResolver, AcademiesService],
  exports: [AcademiesService],
})
export class AcademiesModule {}
