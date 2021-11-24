import { Args, Query, Resolver } from '@nestjs/graphql';
import { Group } from '../models/group.model';
import { EntityResolver } from '../../shared/classes/entity-resolver.class';
import { GroupService } from '../interfaces/group-service.interface';
import { GetGroupArgs } from '../dto/get-group.args';
import { map } from 'rxjs/operators';
import { GetFacultyGroupsArgs } from '../dto/get-faculty-groups.args';
import { GetSpecialityGroupsArgs } from '../dto/get-speciality-groups.args';
import { GetGroupsArgs } from '../dto/get-groups.args';

@Resolver(of => Group)
export class GroupsResolver extends EntityResolver {
  private groupService: GroupService;

  onModuleInit() {
    this.groupService = this.client.getService<GroupService>('GroupService');
  }

  @Query(returns => Group, { name: 'group' })
  getGroup(@Args() { id, academyId }: GetGroupArgs) {
    return this.groupService
      .getGroup({ id, academyId })
      .pipe(map(({ data }) => data.pop()));
  }

  @Query(returns => [Group], { name: 'groups' })
  getGroups(@Args() { academyId, page }: GetGroupsArgs) {
    return this.groupService
      .listGroups({ academyId, page })
      .pipe(map(({ data }) => data));
  }

  @Query(returns => [Group], { name: 'facultyGroups' })
  getFacultyGroups(@Args() { facultyId, academyId }: GetFacultyGroupsArgs) {
    return this.groupService
      .listFacultyGroups({ facultyId, academyId })
      .pipe(map(({ data }) => data));
  }

  @Query(returns => [Group], { name: 'specialityGroups' })
  getSpecialityGroups(
    @Args() { specialityId, academyId }: GetSpecialityGroupsArgs,
  ) {
    return this.groupService
      .listSpecialityGroups({ specialityId, academyId })
      .pipe(map(({ data }) => data));
  }
}
