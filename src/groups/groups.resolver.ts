import { Args, Query, Resolver } from '@nestjs/graphql';
import { Group } from './models/group.model';
import { EntityResolver } from '../grabber/classes/entity-resolver.class';
import { GroupService } from './interfaces/group-service.interface';
import { FetchGroupArgs } from './dto/fetch-group.args';
import { map } from 'rxjs/operators';
import { FetchGroupsArgs } from './dto/fetch-groups.args';

@Resolver(of => Group)
export class GroupsResolver extends EntityResolver {
  private groupService: GroupService;

  onModuleInit() {
    this.groupService = this.client.getService<GroupService>('GroupService');
  }

  @Query(returns => Group, { name: 'group' })
  getGroup(@Args() { id, academyId }: FetchGroupArgs) {
    return this.groupService
      .getGroup({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Group], { name: 'groups' })
  getGroups(@Args() { academyId }: FetchGroupsArgs) {
    return this.groupService
      .listGroups({ academyId })
      .pipe(map(({ data }) => data));
  }
}
