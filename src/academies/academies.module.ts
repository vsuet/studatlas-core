import { Module } from '@nestjs/common';
import { AcademiesResolver } from './academies.resolver';
import { AcademiesService } from './academies.service';
import { FacultiesModule } from '../faculties/faculties.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [FacultiesModule, GroupsModule],
  providers: [AcademiesResolver, AcademiesService],
})
export class AcademiesModule {}
