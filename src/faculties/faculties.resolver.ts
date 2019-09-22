import { Args, Query, Resolver } from '@nestjs/graphql';
import { FacultiesService } from './faculties.service';
import { Faculty } from './models/faculty.model';
import { FetchFacultiesArgs } from './dto/fetch-faculties.args';
import { Observable } from 'rxjs';
import { FetchFacultyArgs } from './dto/fetch-faculty.args';

@Resolver(of => Faculty)
export class FacultiesResolver {
  constructor(private readonly facultiesService: FacultiesService) {}

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
