import { Module } from '@nestjs/common';
import { GrabberService } from './grabber.service';

@Module({
  providers: [GrabberService]
})
export class GrabberModule {}
