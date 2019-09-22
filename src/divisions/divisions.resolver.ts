import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Division } from './models/division.model';
import { DivisionsService } from './divisions.service';
import { FetchDivisionArgs } from './dto/fetch-division.args';
import { FetchDivisionsArgs } from './dto/fetch-divisions.args';
import { StatisticsService } from '../statistics/statistics.service';
import { Statistics } from '../statistics/models/statistics.model';

@Resolver(of => Division)
export class DivisionsResolver {
  constructor(
    private readonly divisionsService: DivisionsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @ResolveProperty()
  statistics(@Parent() { id, academyId }: Division): Observable<Statistics> {
    return this.statisticsService.fetchByDivisionId({
      academyId,
      divisionId: id,
    });
  }

  @Query(returns => Division, { name: 'division' })
  fetchDivision(
    @Args() fetchDivisionArgs: FetchDivisionArgs,
  ): Observable<Division> {
    return this.divisionsService.fetchById(fetchDivisionArgs);
  }

  @Query(returns => [Division], { name: 'divisions' })
  fetchDivisions(
    @Args() fetchDivisionsArgs: FetchDivisionsArgs,
  ): Observable<Division[]> {
    return this.divisionsService.fetchAll(fetchDivisionsArgs);
  }
}
