import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesResolver } from './faculties.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { SpecialitiesModule } from '../specialities/specialities.module';

@Module({
  imports: [GrabberModule, GroupsModule, SpecialitiesModule],
  providers: [FacultiesService, FacultiesResolver],
  exports: [FacultiesService],
})
export class FacultiesModule {}
