import { HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesResolver } from './faculties.resolver';
import { Iconv } from 'iconv';
import { Buffer } from 'safe-buffer';

const iconv = new Iconv('CP1251', 'UTF-8');

@Module({
  imports: [
    HttpModule.register({
      responseType: 'arraybuffer',
    }),
  ],
  providers: [FacultiesService, FacultiesResolver],
  exports: [FacultiesService],
})
export class FacultiesModule implements OnModuleInit {
  constructor(private httpService: HttpService) {}

  public onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(req => {
      console.log('request', req);

      return req;
    });

    this.httpService.axiosRef.interceptors.response.use(response => {
      // fix charset
      response.data = iconv
        .convert(Buffer.from(response.data, 'binary'))
        .toString();
      return response;
    });
  }
}
