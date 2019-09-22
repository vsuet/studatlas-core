import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Academy } from '../academies/models/academy.model';
import { Observable } from 'rxjs';;
import { SpecialitiesService } from './specialities.service';
import { Speciality } from './models/speciality.model';

@Resolver(of => Speciality)
export class SpecialitiesResolver {
  constructor(private readonly specialitiesService: SpecialitiesService) {}
}
