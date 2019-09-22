import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { Academy } from './models/academy.model';
import { AcademiesService } from './academies.service';
import { Observable } from 'rxjs';
import { GetAcademyArgs } from './dto/get-academy.args';
import { FacultiesService } from '../faculties/faculties.service';
import { GroupsService } from '../groups/groups.service';
import { Faculty } from '../faculties/models/faculty.model';
import { Group } from '../groups/models/group.model';
import { DivisionsService } from '../divisions/divisions.service';
import { Division } from '../divisions/models/division.model';
import { SpecialitiesService } from '../specialities/specialities.service';

@Resolver(of => Academy)
export class AcademiesResolver {
  constructor(
    private readonly academiesService: AcademiesService,
    private readonly divisionsService: DivisionsService,
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
    private readonly specialitiesService: SpecialitiesService,
  ) {}

  @Query(returns => Academy, { name: 'academy' })
  getAcademy(@Args() { academyId }: GetAcademyArgs): Observable<Academy> {
    return this.academiesService.findById(academyId);
  }

  @Query(returns => [Academy], { name: 'academies' })
  getAcademies(): Observable<Academy[]> {
    return this.academiesService.findAll();
  }

  @ResolveProperty()
  faculties(@Parent() { id }: Academy): Observable<Faculty[]> {
    return this.facultiesService.fetchAll({ academyId: id });
  }

  @ResolveProperty()
  groups(@Parent() { id }: Academy): Observable<Group[]> {
    return this.groupsService.fetchAll({ academyId: id });
  }

  @ResolveProperty()
  divisions(@Parent() { id }: Academy): Observable<Division[]> {
    return this.divisionsService.fetchAll({ academyId: id });
  }

  @ResolveProperty()
  specialities(@Parent() { id }: Academy): Observable<Division[]> {
    return this.specialitiesService.fetchAll({ academyId: id });
  }
}
