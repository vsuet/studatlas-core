import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesResolver } from './specialities.resolver';
import { GrabberModule } from '../grabber/grabber.module';

@Module({
  imports: [GrabberModule],
  providers: [SpecialitiesService, SpecialitiesResolver],
  exports: [SpecialitiesService],
})
export class SpecialitiesModule {}
