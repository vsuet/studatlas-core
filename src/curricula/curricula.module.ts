import { Module } from '@nestjs/common';
import { CurriculaResolver } from './curricula.resolver';
import { CurriculaService } from './curricula.service';
import { GrabberModule } from '../grabber/grabber.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { PracticesResolver } from './practices.resolver';

@Module({
  imports: [GrabberModule, DivisionsModule],
  providers: [CurriculaResolver, CurriculaService, PracticesResolver],
})
export class CurriculaModule {}
