import { Module } from '@nestjs/common';
import { DivisionsResolver } from './divisions.resolver';

@Module({
  providers: [DivisionsResolver],
})
export class DivisionsModule {}
