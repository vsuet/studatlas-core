import { Query, Resolver } from '@nestjs/graphql';
import { Speciality } from './models/speciality.model';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { SpecialityService } from './interafces/speciality-service.interface';
import { FetchSpecialityArgs } from './dto/fetch-speciality.args';
import { map } from 'rxjs/operators';
import { FetchSpecialitiesArgs } from './dto/fetch-specialities.args';

@Resolver(of => Speciality)
export class SpecialitiesResolver extends EntityResolver {
  private specialityService: SpecialityService;

  onModuleInit() {
    this.specialityService = this.client.getService<SpecialityService>(
      'SpecialityService',
    );
  }

  @Query(returns => Speciality, { name: 'speciality' })
  getSpeciality({ id, academyId }: FetchSpecialityArgs) {
    return this.specialityService
      .getSpeciality({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Speciality], { name: 'speciality' })
  getSpecialities({ academyId }: FetchSpecialitiesArgs) {
    return this.specialityService
      .listSpecialities({ academyId })
      .pipe(map(({ data }) => data));
  }
}
