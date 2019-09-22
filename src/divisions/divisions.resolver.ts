import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Division } from './models/division.model';
import { DivisionsService } from './divisions.service';
import { FetchDivisionArgs } from './dto/fetch-division.args';
import { FetchDivisionsArgs } from './dto/fetch-divisions.args';

@Resolver(of => Division)
export class DivisionsResolver {
  constructor(private readonly divisionsService: DivisionsService) {}

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
