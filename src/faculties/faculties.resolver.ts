import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { FacultiesService } from './faculties.service';
import { Faculty } from './models/faculty.model';
import { FetchFacultiesArgs } from './dto/fetch-faculties.args';
import { Observable } from 'rxjs';
import { Academy } from '../academies/models/academy.model';

@Resolver(of => Faculty)
export class FacultiesResolver {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Query(returns => [Faculty], { name: 'faculties' })
  fetchFaculties(@Args() { academyId }: FetchFacultiesArgs):
    | Observable<Faculty[]>
    | any {
    return this.facultiesService.fetchAll(academyId);
  }
}
