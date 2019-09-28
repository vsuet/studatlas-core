import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class GrabberService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  createClient() {
    return this.httpService;
  }
}
