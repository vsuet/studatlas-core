import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ACADEMIES } from './mocks/academies.mock';
import { Academy } from './models/academy.model';

@Injectable()
export class AcademiesService {
  private readonly academies = ACADEMIES;

  findById(academyId: string) {
    const academy = this.academies.find(a => a.id === academyId);
    return of(academy);
  }

  findAll(): Observable<Academy[]> {
    return of(this.academies);
  }
}
