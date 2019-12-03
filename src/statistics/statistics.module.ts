import { Module } from '@nestjs/common';
import { StatisticsResolver } from './resolvers/statistics.resolver';

@Module({
  providers: [StatisticsResolver],
})
export class StatisticsModule {}
