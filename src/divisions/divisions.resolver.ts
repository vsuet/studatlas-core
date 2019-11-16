import { Query, Resolver } from '@nestjs/graphql';
import { Division } from './models/division.model';
import { FetchDivisionArgs } from './dto/fetch-division.args';
import { DivisionService } from './interfaces/division-service.interface';
import { map } from 'rxjs/operators';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { FetchDivisionsArgs } from './dto/fetch-divisions.args';

@Resolver(of => Division)
export class DivisionsResolver extends EntityResolver {
  private divisionService: DivisionService;

  onModuleInit() {
    this.divisionService = this.client.getService<DivisionService>(
      'DivisionService',
    );
  }

  @Query(returns => Division, { name: 'division' })
  getDivision({ id, academyId }: FetchDivisionArgs) {
    return this.divisionService
      .getDivision({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Division], { name: 'divisions' })
  getDivisions({ academyId }: FetchDivisionsArgs) {
    return this.divisionService
      .listDivisions({ academyId })
      .pipe(map(({ data }) => data));
  }
}
