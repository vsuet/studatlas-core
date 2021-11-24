import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

export interface GroupService {
  getGroup(data: {
    id: number;
    academyId: string;
  }): Observable<{ data: Group[] }>;
  listGroups(data: { academyId: string }): Observable<{ data: Group[] }>;
  listFacultyGroups(data: {
    facultyId: number;
    academyId: string;
  }): Observable<{ data: Group[] }>;
  listSpecialityGroups(data: {
    specialityId: number;
    academyId: string;
  }): Observable<{ data: Group[] }>;
}
