import { Observable } from 'rxjs';
import { Speciality } from '../models/speciality.model';

export interface SpecialityService {
  getSpeciality(data: {
    id: number;
    academyId: string;
  }): Observable<{ data: Speciality[] }>;
  listSpecialities(data: {
    academyId: string;
  }): Observable<{ data: Speciality[] }>;
  listFacultySpecialities(data: {
    facultyId: number;
    academyId: string;
  }): Observable<{ data: Speciality[] }>;
}
