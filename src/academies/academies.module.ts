import { Module } from '@nestjs/common';
import { AcademiesResolver } from './academies.resolver';
// import { CurriculaModule } from '../curricula/curricula.module';

@Module({
  providers: [AcademiesResolver],
})
export class AcademiesModule {}
