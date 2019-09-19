import { Module } from '@nestjs/common';
import { AcademiesResolver } from './academies.resolver';
import { AcademiesService } from './academies.service';
import { FacultiesModule } from '../faculties/faculties.module';

@Module({
  imports: [FacultiesModule],
  providers: [AcademiesResolver, AcademiesService],
})
export class AcademiesModule {}
