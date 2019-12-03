import { Module } from '@nestjs/common';
import { FacultiesResolver } from './resolvers/faculties.resolver';

@Module({
  providers: [FacultiesResolver],
})
export class FacultiesModule {}
