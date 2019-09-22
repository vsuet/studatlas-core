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
import { SpecialitiesService } from '../specialities/specialities.service';
import { Speciality } from '../specialities/models/speciality.model';
import { Statistics } from '../statistics/models/statistics.model';
import { StatisticsService } from '../statistics/statistics.service';
import { StatisticsFilterArgs } from '../statistics/dto/statistics-filter.args';

@Resolver(of => Faculty)
export class FacultiesResolver {
  constructor(
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @ResolveProperty()
  statistics(
    @Args() { year, semester }: StatisticsFilterArgs,
    @Parent() { id, academyId }: Faculty,
  ): Observable<Statistics> {
    return this.statisticsService.fetchByFacultyId({
      academyId,
      facultyId: id,
      year,
      semester,
    });
  }

  @ResolveProperty()
  specialities(@Parent() { id, academyId }: Faculty): Observable<Speciality[]> {
    return this.specialitiesService.fetchByFacultyId({
      academyId,
      facultyId: id,
    });
  }

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
