import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Speciality } from './models/speciality.model';
import { Group } from '../groups/models/group.model';
import { GroupsService } from '../groups/groups.service';
import { DivisionsService } from '../divisions/divisions.service';
import { Division } from '../divisions/models/division.model';
import { FacultiesService } from '../faculties/faculties.service';
import { Faculty } from '../faculties/models/faculty.model';

@Resolver(of => Speciality)
export class SpecialitiesResolver {
  constructor(
    private readonly divisionsService: DivisionsService,
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
  ) {}

  @ResolveProperty()
  faculty(@Parent() { facultyId, academy }: Speciality): Observable<Faculty> {
    return this.facultiesService.fetchById(facultyId, academy);
  }

  @ResolveProperty()
  division(@Parent() { divisionId, academy }: Speciality): Observable<
    Division
  > {
    return this.divisionsService.fetchById(divisionId, academy);
  }

  @ResolveProperty()
  groups(@Parent() { id, academy }: Speciality): Observable<Group[]> {
    return this.groupsService.fetchBySpecialityId(id, academy);
  }
}
