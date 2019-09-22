import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Group } from './models/group.model';
import { GroupsService } from './groups.service';
import { FetchGroupArgs } from './dto/fetch-group.args';
import { FetchGroupsArgs } from './dto/fetch-groups.args';
import { SpecialitiesService } from '../specialities/specialities.service';
import { Speciality } from '../specialities/models/speciality.model';
import { Book } from '../books/models/book.model';
import { BooksService } from '../books/books.service';

@Resolver(of => Group)
export class GroupsResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly groupsService: GroupsService,
    private readonly specialitiesService: SpecialitiesService,
  ) {}

  @ResolveProperty()
  books(@Parent() { academyId, id }: Group): Observable<Book> {
    return this.booksService.fetchByGroupId({
      academyId,
      groupId: id,
    });
  }

  @ResolveProperty()
  speciality(@Parent() { academyId, specialityId }: Group): Observable<
    Speciality
  > {
    return this.specialitiesService.fetchById({
      academyId,
      specialityId,
    });
  }

  @Query(returns => Group, { name: 'group' })
  fetchSpeciality(@Args() fetchGroupArgs: FetchGroupArgs): Observable<Group> {
    return this.groupsService.fetchById(fetchGroupArgs);
  }

  @Query(returns => [Group], { name: 'groups' })
  fetchSpecialities(
    @Args() fetchGroupsArgs: FetchGroupsArgs,
  ): Observable<Group[]> {
    return this.groupsService.fetchAll(fetchGroupsArgs);
  }
}
