import { Module } from '@nestjs/common';
import { DivisionsService } from './divisions.service';
import { DivisionsResolver } from './divisions.resolver';
import { GrabberModule } from '../grabber/grabber.module';

@Module({
  imports: [GrabberModule],
  providers: [DivisionsService, DivisionsResolver],
  exports: [DivisionsService],
})
export class DivisionsModule {}
