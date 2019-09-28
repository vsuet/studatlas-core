import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Group } from './models/group.model';
import { GroupsService } from './groups.service';
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
  books(
    @Parent() { id, academy }: Group,
  ): Observable<Book[]> {
    return this.booksService.fetchByGroupId(id, academy);
  }

  @ResolveProperty()
  speciality(
    @Parent() { specialityId, academy }: Group,
  ): Observable<Speciality> {
    return this.specialitiesService.fetchById(specialityId, academy);
  }
}
