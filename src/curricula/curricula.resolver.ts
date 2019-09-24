import { Args, Query, Resolver } from '@nestjs/graphql';
import { Curriculum } from './models/curriculum.model';
import { Observable } from 'rxjs';
import { FetchCurriculumArgs } from './dto/fetch-curriculum.args';
import { CurriculaService } from './curricula.service';

@Resolver(of => Curriculum)
export class CurriculaResolver {
  constructor(private readonly curriculaService: CurriculaService) {}

  @Query(returns => Curriculum, { name: 'curriculum' })
  fetchCurriculum(@Args()
  {
    academyId,
    curriculumId,
  }: FetchCurriculumArgs): Observable<Curriculum> | any {
    return this.curriculaService.fetchById({ academyId, curriculumId });
  }
}
