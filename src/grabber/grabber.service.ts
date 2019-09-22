import { HttpService, Injectable } from '@nestjs/common';
import { AcademiesService } from '../academies/academies.service';

@Injectable()
export class GrabberService {
  constructor(
    private readonly academiesService: AcademiesService,
    private readonly httpService: HttpService,
  ) {}

  createClient(academyId) {
   const client = this.httpService;
   this.academiesService.findById(academyId).subscribe(academy =>
      client.axiosRef.interceptors.request.use(req => {
        //console.log({ req })
        // подкладываем url для конкретного вуза
        req.baseURL = academy.endpoint;
        return req;
      }),
    );
   return client;
  }
}
