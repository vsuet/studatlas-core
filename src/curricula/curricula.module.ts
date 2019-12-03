import { Module } from '@nestjs/common';
import { CurriculaResolver } from './resolvers/curricula.resolver';

@Module({
  providers: [CurriculaResolver],
})
export class CurriculaModule {}
