import { Args, Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Division } from './models/division.model';
import { DivisionsService } from './divisions.service';
import { StatisticsService } from '../statistics/statistics.service';
import { Statistics } from '../statistics/models/statistics.model';
import { StatisticsFilterArgs } from '../statistics/dto/statistics-filter.args';

@Resolver(of => Division)
export class DivisionsResolver {
  constructor(
    private readonly divisionsService: DivisionsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @ResolveProperty()
  statistics(
    @Args() { year, semester }: StatisticsFilterArgs,
    @Parent() { id, academy }: Division,
  ): Observable<Statistics> {
    return this.statisticsService.fetchByDivisionId(id, year, semester, academy);
  }
}
