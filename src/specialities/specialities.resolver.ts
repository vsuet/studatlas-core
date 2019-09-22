import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SpecialitiesService } from './specialities.service';
import { Speciality } from './models/speciality.model';
import { FetchSpecialityArgs } from './dto/fetch-speciality.args';
import { FetchSpecialitiesArgs } from './dto/fetch-specialities.args';

@Resolver(of => Speciality)
export class SpecialitiesResolver {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Query(returns => Speciality, { name: 'speciality' })
  fetchSpeciality(
    @Args() fetchSpecialityArgs: FetchSpecialityArgs,
  ): Observable<Speciality> {
    return this.specialitiesService.fetchById(fetchSpecialityArgs);
  }

  @Query(returns => [Speciality], { name: 'specialities' })
  fetchSpecialities(
    @Args() fetchSpecialitiesArgs: FetchSpecialitiesArgs,
  ): Observable<Speciality[]> {
    return this.specialitiesService.fetchAll(fetchSpecialitiesArgs);
  }
}
