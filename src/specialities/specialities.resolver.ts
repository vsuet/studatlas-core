import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SpecialitiesService } from './specialities.service';
import { Speciality } from './models/speciality.model';
import { FetchSpecialityArgs } from './dto/fetch-speciality.args';
import { FetchSpecialitiesArgs } from './dto/fetch-specialities.args';
import { Group } from '../groups/models/group.model';
import { GroupsService } from '../groups/groups.service';

@Resolver(of => Speciality)
export class SpecialitiesResolver {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly specialitiesService: SpecialitiesService,
  ) {}

  @ResolveProperty()
  groups(@Parent() { id, academyId }: Speciality): Observable<Group[]> {
    return this.groupsService.fetchBySpecialityId({
      academyId,
      specialityId: id,
    });
  }

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
