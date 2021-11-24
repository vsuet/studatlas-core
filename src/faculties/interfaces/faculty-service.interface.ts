import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty.model';

export interface FacultyService {
  getFaculty(data: {
    id: number;
    academyId: string;
  }): Observable<{ data: Faculty[] }>;
  listFaculties(data: { academyId: string }): Observable<{ data: Faculty[] }>;
}
