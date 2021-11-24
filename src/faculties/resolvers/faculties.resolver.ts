import { Args, Query, Resolver } from '@nestjs/graphql';
import { Faculty } from '../models/faculty.model';
import { GetFacultyArgs } from '../dto/get-faculty.args';
import { FacultyService } from '../interfaces/faculty-service.interface';
import { map } from 'rxjs/operators';
import { GetFacultiesArgs } from '../dto/get-faculties.args';
import { EntityResolver } from '../../shared/classes/entity-resolver.class';

@Resolver(of => Faculty)
export class FacultiesResolver extends EntityResolver {
  private facultyService: FacultyService;

  onModuleInit() {
    this.facultyService = this.client.getService<FacultyService>(
      'FacultyService',
    );
  }

  @Query(returns => Faculty, { name: 'faculty' })
  getFaculty(@Args() { id, academyId }: GetFacultyArgs) {
    return this.facultyService
      .getFaculty({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Faculty], { name: 'faculties' })
  getFaculties(@Args() { academyId }: GetFacultiesArgs) {
    return this.facultyService
      .listFaculties({ academyId })
      .pipe(map(({ data }) => data));
  }
}
