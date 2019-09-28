import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Practice } from './models/practice.model';
import { DivisionsService } from '../divisions/divisions.service';
import { Division } from '../divisions/models/division.model';

@Resolver(of => Practice)
export class PracticesResolver {
  constructor(private readonly divisionsService: DivisionsService) {}

  @ResolveProperty(returns => Division)
  division(
    @Parent() { divisionId, academy }: Practice,
  ): Observable<Division> {
    return this.divisionsService.fetchById(divisionId, academy);
  }
}
