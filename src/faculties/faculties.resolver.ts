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
import { FetchFacultyArgs } from './dto/fetch-faculty.args';
import { Group } from '../groups/models/group.model';
import { GroupsService } from '../groups/groups.service';

@Resolver(of => Faculty)
export class FacultiesResolver {
  constructor(
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
  ) {}

  @ResolveProperty()
  groups(@Parent() { id, academyId }: Faculty): Observable<Group[]> {
    return this.groupsService.fetchByFacultyId({
      academyId,
      facultyId: id,
    });
  }

  @Query(returns => Faculty, { name: 'faculty' })
  fetchFaculty(
    @Args() fetchFacultyArgs: FetchFacultyArgs,
  ): Observable<Faculty> {
    return this.facultiesService.fetchById(fetchFacultyArgs);
  }

  @Query(returns => [Faculty], { name: 'faculties' })
  fetchFaculties(
    @Args() fetchFacultiesArgs: FetchFacultiesArgs,
  ): Observable<Faculty[]> {
    return this.facultiesService.fetchAll(fetchFacultiesArgs);
  }
}
