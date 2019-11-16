import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Practice } from './models/practice.model';
import { Division } from '../divisions/models/division.model';

@Resolver(of => Practice)
export class PracticesResolver {

}
