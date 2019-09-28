import { Resolver } from '@nestjs/graphql';
import { Curriculum } from './models/curriculum.model';
import { CurriculaService } from './curricula.service';

@Resolver(of => Curriculum)
export class CurriculaResolver {
  constructor(private readonly curriculaService: CurriculaService) {}
}
