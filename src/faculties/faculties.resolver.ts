import { Args, Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { FacultiesService } from './faculties.service';
import { Faculty } from './models/faculty.model';
import { Observable } from 'rxjs';
import { Group } from '../groups/models/group.model';
import { GroupsService } from '../groups/groups.service';
import { SpecialitiesService } from '../specialities/specialities.service';
import { Speciality } from '../specialities/models/speciality.model';
import { Statistics } from '../statistics/models/statistics.model';
import { StatisticsService } from '../statistics/statistics.service';
import { StatisticsFilterArgs } from '../statistics/dto/statistics-filter.args';

import { UseInterceptors } from '@nestjs/common';
import { AcademyInterceptor } from '../academies/interceptors/academy.interceptor';

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
    @Parent() { id, academy }: Faculty,
  ): Observable<Statistics> {
    return this.statisticsService.fetchByFacultyId(id, year, semester, academy);
  }

  @ResolveProperty()
  specialities(@Parent() { id, academy }: Faculty): Observable<Speciality[]> {
    return this.specialitiesService.fetchByFacultyId(id, academy);
  }

  @ResolveProperty()
  @UseInterceptors(AcademyInterceptor)
  groups(@Parent() { id, academy }: Faculty): Observable<Group[]> {
    return this.groupsService.fetchByFacultyId(id, academy);
  }
}
