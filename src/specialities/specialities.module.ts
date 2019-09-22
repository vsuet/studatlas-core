import { forwardRef, Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesResolver } from './specialities.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { FacultiesModule } from '../faculties/faculties.module';

@Module({
  imports: [
    GrabberModule,
    forwardRef(() => GroupsModule),
    DivisionsModule,
    forwardRef(() => FacultiesModule),
  ],
  providers: [SpecialitiesService, SpecialitiesResolver],
  exports: [SpecialitiesService],
})
export class SpecialitiesModule {}
