import { Injectable } from '@nestjs/common';

@Injectable()
export class AcademiesService {

  findById(id: string): any {
    return 1;
  }

  findAll(): any {
    return [1];
  }
}
