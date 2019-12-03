import { Args, Query, Resolver } from '@nestjs/graphql';
import { Speciality } from '../models/speciality.model';
import { EntityResolver } from '../../shared/classes/entity-resolver.class';
import { SpecialityService } from '../interafces/speciality-service.interface';
import { GetSpecialityArgs } from '../dto/get-speciality.args';
import { map } from 'rxjs/operators';
import { GetSpecialitiesArgs } from '../dto/get-specialities.args';

@Resolver(of => Speciality)
export class SpecialitiesResolver extends EntityResolver {
  private specialityService: SpecialityService;

  onModuleInit() {
    this.specialityService = this.client.getService<SpecialityService>(
      'SpecialityService',
    );
  }

  @Query(returns => Speciality, { name: 'speciality' })
  getSpeciality(@Args() { id, academyId }: GetSpecialityArgs) {
    return this.specialityService
      .getSpeciality({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Speciality], { name: 'specialities' })
  getSpecialities(@Args() { academyId }: GetSpecialitiesArgs) {
    return this.specialityService
      .listSpecialities({ academyId })
      .pipe(map(({ data }) => data));
  }
}
