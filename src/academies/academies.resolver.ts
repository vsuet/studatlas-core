import { Args, Query, Resolver } from '@nestjs/graphql';
import { Academy } from './models/academy.model';
import { GetAcademyArgs } from './dto/get-academy.args';
import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { map } from 'rxjs/operators';

interface AcademyService {
  getAcademy(data: { id: string }): Observable<{ data: any[] }>;
  listAcademies(data: {}): Observable<{ data: any[] }>;
}

@Resolver(of => Academy)
export class AcademiesResolver implements OnModuleInit {
  private academyService: AcademyService;
  @Client({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50052',
      package: 'grabber',
      protoPath: join(__dirname, '../shared/protobuf/grabber.proto'),
    },
  })
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.academyService = this.client.getService<AcademyService>(
      'AcademyService',
    );
  }

  @Query(returns => Academy, { name: 'academy' })
  getAcademy(@Args() { id }: GetAcademyArgs): Observable<any> {
    return this.academyService
      .getAcademy({ id })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Academy], { name: 'academies' })
  getAcademies(): Observable<any[]> {
    return this.academyService.listAcademies({}).pipe(
      map(({ data }) => {
        console.log(data);
        return data;
      }),
    );
  }
}
