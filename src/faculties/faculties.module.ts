import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesResolver } from './faculties.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [GrabberModule, GroupsModule],
  providers: [FacultiesService, FacultiesResolver],
  exports: [FacultiesService],
})
export class FacultiesModule {}
