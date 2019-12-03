import { Args, Query, Resolver } from '@nestjs/graphql';
import { Academy } from '../models/academy.model';
import { GetAcademyArgs } from '../dto/get-academy.args';
import { map } from 'rxjs/operators';
import { AcademyService } from '../interfaces/academy-service.interface';
import { EntityResolver } from '../../shared/classes/entity-resolver.class';

@Resolver(of => Academy)
export class AcademiesResolver extends EntityResolver {
  private academyService: AcademyService;

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
    return this.academyService.listAcademies({}).pipe(map(({ data }) => data));
  }
}
