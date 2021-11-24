import { Module } from '@nestjs/common';
import { SpecialitiesResolver } from './resolvers/specialities.resolver';

@Module({
  providers: [SpecialitiesResolver],
})
export class SpecialitiesModule {}
