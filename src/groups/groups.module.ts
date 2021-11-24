import { Module } from '@nestjs/common';
import { GroupsResolver } from './resolvers/groups.resolver';

@Module({
  providers: [GroupsResolver],
})
export class GroupsModule {}
