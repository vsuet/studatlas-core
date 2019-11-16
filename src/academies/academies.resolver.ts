import { Args, Query, Resolver } from '@nestjs/graphql';
import { Academy } from './models/academy.model';
import { GetAcademyArgs } from './dto/get-academy.args';
import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { AcademyService } from './interfaces/academy-service.interface';
import { grabberClientOptions } from '../grabber/options/grabber-client.options';

@Resolver(of => Academy)
export class AcademiesResolver implements OnModuleInit {
  private academyService: AcademyService;
  @Client(grabberClientOptions)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.academyService = this.client.getService<AcademyService>(
      'AcademyService',
    );
  }

  @Query(returns => Academy, { name: 'academy' })
  getAcademy(@Args() { id }: GetAcademyArgs) {
    return this.academyService
      .getAcademy({ id })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Academy], { name: 'academies' })
  getAcademies() {
    return this.academyService.listAcademies({}).pipe(
      map(({ data }) => {
        return data;
      }),
    );
  }
}
