import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { DocumentMember } from './models/document-member.model';
import { Book } from '../books/models/book.model';

@Resolver(of => DocumentMember)
export class DocumentMembersResolver {

}
