import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Academy } from '../academies/models/academy.model';
import { Observable } from 'rxjs';
import { Group } from './models/group.model';
import { GroupsService } from './groups.service';

@Resolver(of => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}
}
