import { Args, Query, Resolver } from '@nestjs/graphql';
import { Statistics } from './models/statistics.model';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { StatisticsService } from './interfaces/statistics-service.interface';
import { FetchStatisticsArgs } from './dto/fetch-statistics.args';
import { map } from 'rxjs/operators';

@Resolver(of => Statistics)
export class StatisticsResolver extends EntityResolver {
  private statisticsService: StatisticsService;

  onModuleInit() {
    this.statisticsService = this.client.getService<StatisticsService>(
      'StatisticsService',
    );
  }

  @Query(returns => [Statistics], { name: 'statistics' })
  getStatistics(@Args()
  {
    mode,
    semester,
    year,
    academyId,
  }: FetchStatisticsArgs) {
    switch (mode) {
      case 'divisions': {
        return this.statisticsService
          .listDivisionsStatistics({ semester, year, academyId })
          .pipe(map(({ data }) => data));
      }
      case 'faculties': {
        return this.statisticsService
          .listDivisionsStatistics({ semester, year, academyId })
          .pipe(map(({ data }) => data));
      }
    }
  }
}
