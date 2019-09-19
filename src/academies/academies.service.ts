import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ACADEMIES } from './mocks/academies.mock';
import { Academy } from './interfaces/academy.interface';
import { Faculty } from '../faculties/interfaces/faculty.interface';

@Injectable()
export class AcademiesService {
  private readonly academies = ACADEMIES;

  findById(academyId: string) {
    const academy = ACADEMIES.find((a: Academy) => a.id === academyId);
    return of(academy);
  }

  findAll(): Observable<Academy[]> {
    return of(ACADEMIES);
  }
}
