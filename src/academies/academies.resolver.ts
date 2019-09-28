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
import { FetchFacultyArgs } from '../faculties/dto/fetch-faculty.args';
import { Book } from '../books/models/book.model';
import { FetchBookArgs } from '../books/dto/fetch-book.args';
import { BooksService } from '../books/books.service';
import { FetchDivisionArgs } from '../divisions/dto/fetch-division.args';
import { Curriculum } from '../curricula/models/curriculum.model';
import { FetchCurriculumArgs } from '../curricula/dto/fetch-curriculum.args';
import { CurriculaService } from '../curricula/curricula.service';
import { Document } from '../documents/models/document.model';
import { FetchDocumentArgs } from '../documents/dto/fetch-document.args';
import { DocumentsService } from '../documents/documents.service';
import { Speciality } from '../specialities/models/speciality.model';
import { FetchGroupArgs } from '../groups/dto/fetch-group.args';
import { FetchSpecialitiesArgs } from '../specialities/dto/fetch-specialities.args';
import { FetchSpecialityArgs } from '../specialities/dto/fetch-speciality.args';
import { FetchFacultiesArgs } from '../faculties/dto/fetch-faculties.args';
import { Statistics } from '../statistics/models/statistics.model';
import { FetchStatisticsArgs } from '../statistics/dto/fetch-statistics.args';
import { StatisticsService } from '../statistics/statistics.service';

@Resolver(of => Academy)
export class AcademiesResolver {
  constructor(
    private readonly academiesService: AcademiesService,
    private readonly booksService: BooksService,
    private readonly curriculaService: CurriculaService,
    private readonly divisionsService: DivisionsService,
    private readonly documentsService: DocumentsService,
    private readonly facultiesService: FacultiesService,
    private readonly groupsService: GroupsService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Query(returns => Academy, { name: 'academy' })
  getAcademy(@Args() { id }: GetAcademyArgs): Promise<Academy> {
    return this.academiesService.findById(id);
  }

  @Query(returns => [Academy], { name: 'academies' })
  getAcademies(): Promise<Academy[]> {
    return this.academiesService.findAll();
  }

  // properties

  @Query(returns => Book)
  book(
    @Parent() academy: Academy,
    @Args() { id }: FetchBookArgs,
  ): Observable<Book> {
    return this.booksService.fetchById(id, academy);
  }

  @ResolveProperty(returns => Curriculum)
  curriculum(
    @Parent() academy: Academy,
    @Args() { id }: FetchCurriculumArgs,
  ): Observable<Curriculum> | any {
    return this.curriculaService.fetchById(id, academy);
  }

  @ResolveProperty(returns => Division)
  division(
    @Parent() academy: Academy,
    @Args() { id }: FetchDivisionArgs,
  ): Observable<Division> {
    return this.divisionsService.fetchById(id, academy);
  }

  @ResolveProperty(returns => [Division])
  divisions(@Parent() academy: Academy): Observable<Division[]> {
    return this.divisionsService.fetchAll(academy);
  }

  @ResolveProperty(returns => Document)
  document(
    @Parent() academy: Academy,
    @Args() { id }: FetchDocumentArgs,
  ): Observable<Document> | any {
    return this.documentsService.fetchById(id, academy);
  }

  @ResolveProperty(returns => Faculty)
  faculty(
    @Parent() academy: Academy,
    @Args() { id }: FetchFacultyArgs,
  ): Observable<Faculty> {
    return this.facultiesService.fetchById(id, academy);
  }

  @ResolveProperty(returns => [Faculty])
  faculties(
    @Parent() academy: Academy,
    @Args() fetchFacultiesArgs: FetchFacultiesArgs,
  ): Observable<Faculty[]> {
    return this.facultiesService.fetchAll(academy);
  }

  @ResolveProperty(returns => Group)
  group(
    @Parent() academy: Academy,
    @Args() { id }: FetchGroupArgs,
  ): Observable<Group> {
    return this.groupsService.fetchById(id, academy);
  }

  @ResolveProperty(returns => [Group])
  groups(@Parent() academy: Academy): Observable<Group[]> {
    return this.groupsService.fetchAll(academy);
  }

  @ResolveProperty(returns => Speciality)
  speciality(
    @Parent() academy: Academy,
    @Args() { id }: FetchSpecialityArgs,
  ): Observable<Speciality> {
    return this.specialitiesService.fetchById(id, academy);
  }

  @ResolveProperty(returns => [Speciality])
  specialities(
    @Parent() academy: Academy,
    @Args() fetchSpecialitiesArgs: FetchSpecialitiesArgs,
  ): Observable<Division[]> {
    return this.specialitiesService.fetchAll(academy);
  }

  // TODO: нужны id того с чем связана статистика
  @ResolveProperty(returns => [Statistics])
  statistics(
    @Parent() academy: Academy,
    @Args() { mode, semester, year }: FetchStatisticsArgs,
  ): Observable<Statistics> {
    return this.statisticsService.fetchAll(year, semester, mode, academy);
  }
}
