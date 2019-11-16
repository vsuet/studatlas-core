import { Query, Resolver } from '@nestjs/graphql';
import { Faculty } from './models/faculty.model';
import { FetchFacultyArgs } from './dto/fetch-faculty.args';
import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { FacultyService } from './interfaces/faculty-service.interface';
import { map } from 'rxjs/operators';
import { grabberClientOptions } from '../grabber/options/grabber-client.options';
import { FetchFacultiesArgs } from './dto/fetch-faculties.args';

@Resolver(of => Faculty)
export class FacultiesResolver implements OnModuleInit {
  private facultyService: FacultyService;
  @Client(grabberClientOptions)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.facultyService = this.client.getService<FacultyService>(
      'FacultyService',
    );
  }

  @Query(returns => Faculty, { name: 'faculty' })
  getFaculty({ id, academyId }: FetchFacultyArgs) {
    return this.facultyService
      .getFaculty({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => Faculty, { name: 'faculties' })
  getFaculties({ academyId }: FetchFacultiesArgs) {
    return this.facultyService
      .listFaculties({ academyId })
      .pipe(map(({ data }) => data));
  }
}
