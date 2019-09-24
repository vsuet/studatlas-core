import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Practice } from './models/practice.model';
import { DivisionsService } from '../divisions/divisions.service';
import { Division } from '../divisions/models/division.model';

@Resolver(of => Practice)
export class PracticesResolver {
  constructor(private readonly divisionsService: DivisionsService) {}

  @ResolveProperty()
  division(@Parent() { academyId, divisionId }: Practice): Observable<
    Division
  > {
    return this.divisionsService.fetchById({
      academyId,
      divisionId,
    });
  }
}
