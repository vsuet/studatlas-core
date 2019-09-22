import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Academy } from '../academies/models/academy.model';
import { Observable } from 'rxjs';
import { Division } from './models/division.model';
import { DivisionsService } from './divisions.service';

@Resolver(of => Division)
export class DivisionsResolver {
  constructor(private readonly divisionsService: DivisionsService) {}
}
