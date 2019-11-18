import { Module } from '@nestjs/common';
import { CurriculaResolver } from './curricula.resolver';

@Module({
  providers: [CurriculaResolver],
})
export class CurriculaModule {}
