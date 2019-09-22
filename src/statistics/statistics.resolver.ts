import { Args, Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { Observable } from 'rxjs';
import { Statistics } from './models/statistics.model';
import { FetchStatisticsArgs } from './dto/fetch-statistics.args';

@Resolver(of => Statistics)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  // TODO: нужны id того с чем связана статистика
  @Query(returns => [Statistics], { name: 'statistics' })
  fetchStatistics(
    @Args() fetchStatisticsArgs: FetchStatisticsArgs,
  ): Observable<Statistics> {
    const { academyId, mode, semester, year } = fetchStatisticsArgs;
    return this.statisticsService.fetchAll({
      academyId,
      mode,
      semester,
      year,
    });
  }
}
