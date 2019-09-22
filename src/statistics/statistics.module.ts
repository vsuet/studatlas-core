import { Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { GrabberModule } from '../grabber/grabber.module';

@Module({
  imports: [GrabberModule],
  providers: [StatisticsResolver, StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
