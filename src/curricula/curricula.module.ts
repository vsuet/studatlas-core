import { Module } from '@nestjs/common';
import { CurriculaResolver } from './curricula.resolver';
import { CurriculaService } from './curricula.service';
import { PracticesResolver } from './practices.resolver';

@Module({
  providers: [CurriculaResolver, CurriculaService, PracticesResolver],
  exports: [CurriculaService],
})
export class CurriculaModule {}
