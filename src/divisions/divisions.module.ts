import { Module } from '@nestjs/common';
import { DivisionsResolver } from './resolvers/divisions.resolver';

@Module({
  providers: [DivisionsResolver],
})
export class DivisionsModule {}
