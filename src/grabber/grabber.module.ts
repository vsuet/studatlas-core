import {
  forwardRef,
  HttpModule,
  HttpService,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { GrabberService } from './grabber.service';
import { Buffer } from 'safe-buffer';
import { Iconv } from 'iconv';
import { AcademiesModule } from '../academies/academies.module';

const iconv = new Iconv('CP1251', 'UTF-8');

@Module({
  imports: [
    forwardRef(() => AcademiesModule),
    HttpModule.register({
      responseType: 'arraybuffer',
    }),
  ],
  providers: [GrabberService],
  exports: [HttpModule, GrabberService],
})
export class GrabberModule implements OnModuleInit {
  constructor(private httpService: HttpService) {}

  public onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(req => {
      return req;
    });

    this.httpService.axiosRef.interceptors.response.use(response => {
      // try to fix charset
      try {
        response.data = iconv
          .convert(Buffer.from(response.data, 'binary'))
          .toString();
        return response;
      } catch (e) {
        return response;
      }
    });
  }
}
