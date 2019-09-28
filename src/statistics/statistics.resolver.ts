import { Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { Statistics } from './models/statistics.model';

@Resolver(of => Statistics)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}
}
