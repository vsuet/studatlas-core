import { Observable } from 'rxjs';
import { CurriculumItem } from '../models/curriculum-item.model';

export interface CurriculaService {
  listFacultyCurricula(data: {
    academyId: string;
    facultyId: number;
    years: string;
  }): Observable<{ data: CurriculumItem[] }>;
}
