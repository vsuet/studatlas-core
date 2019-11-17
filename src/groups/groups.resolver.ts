import { Args, Query, Resolver } from '@nestjs/graphql';
import { Group } from './models/group.model';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { GroupService } from './interfaces/group-service.interface';
import { FetchGroupArgs } from './dto/fetch-group.args';
import { map } from 'rxjs/operators';
import { FetchFacultyGroupsArgs } from './dto/fetch-faculty-groups.args';
import { FetchSpecialityGroupsArgs } from './dto/fetch-speciality-groups.args';

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

  @Query(returns => [Group], { name: 'facultyGroups' })
  getFacultyGroups(@Args() { facultyId, academyId }: FetchFacultyGroupsArgs) {
    return this.groupService
      .listFacultyGroups({ facultyId, academyId })
      .pipe(map(({ data }) => data));
  }

  @Query(returns => [Group], { name: 'specialityGroups' })
  getSpecialityGroups(
    @Args() { specialityId, academyId }: FetchSpecialityGroupsArgs,
  ) {
    return this.groupService
      .listSpecialityGroups({ specialityId, academyId })
      .pipe(map(({ data }) => data));
  }
}
