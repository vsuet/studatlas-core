import { HttpModule, HttpService, Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesResolver } from './faculties.resolver';
import { GrabberModule } from '../grabber/grabber.module';

@Module({
  imports: [GrabberModule],
  providers: [FacultiesService, FacultiesResolver],
  exports: [FacultiesService],
})
export class FacultiesModule {}
