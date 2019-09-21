import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { GrabberService } from '../grabber/grabber.service';

@Module({
  imports: [GrabberService],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
