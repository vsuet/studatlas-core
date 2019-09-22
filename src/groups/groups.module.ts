import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { SpecialitiesModule } from '../specialities/specialities.module';

@Module({
  imports: [forwardRef(() => SpecialitiesModule), GrabberModule],
  providers: [GroupsService, GroupsResolver],
  exports: [GroupsService],
})
export class GroupsModule {}
