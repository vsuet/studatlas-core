import { forwardRef, Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesResolver } from './specialities.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { DivisionsModule } from '../divisions/divisions.module';

@Module({
  imports: [GrabberModule, forwardRef(() => GroupsModule), DivisionsModule],
  providers: [SpecialitiesService, SpecialitiesResolver],
  exports: [SpecialitiesService],
})
export class SpecialitiesModule {}
