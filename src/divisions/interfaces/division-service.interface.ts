import { Observable } from 'rxjs';
import { Division } from '../models/division.model';

export interface DivisionService {
  getDivision(data: {
    id: number;
    academyId: string;
  }): Observable<{ data: Division[] }>;
  listDivisions(data: { academyId: string }): Observable<{ data: Division[] }>;
}
