import { Args, Query, Resolver } from '@nestjs/graphql';
import { Curriculum } from '../models/curriculum.model';
import { EntityResolver } from '../../shared/classes/entity-resolver.class';
import { CurriculaService } from '../interfaces/curricula-service.interface';
import { map } from 'rxjs/operators';
import { CurriculumItem } from '../models/curriculum-item.model';
import { GetFacultyCurriculaArgs } from '../dto/get-faculty-curricula.args';

@Resolver(of => Curriculum)
export class CurriculaResolver extends EntityResolver {
  private curriculaService: CurriculaService;

  onModuleInit() {
    this.curriculaService = this.client.getService<CurriculaService>(
      'CurriculaService',
    );
  }

  @Query(returns => [CurriculumItem], { name: 'facultyCurricula' })
  getFacultyCurricula(
    @Args() { academyId, facultyId, years }: GetFacultyCurriculaArgs,
  ) {
    return this.curriculaService
      .listFacultyCurricula({ academyId, facultyId, years })
      .pipe(map(({ data }) => data));
  }
}
