import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsResolver } from './divisions.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [GrabberModule, StatisticsModule],
  providers: [DivisionsService, DivisionsResolver],
  exports: [DivisionsService],
})
export class DivisionsModule {}
