import { Observable } from 'rxjs';
import { Academy } from '../models/academy.model';

export interface AcademyService {
  getAcademy(data: { id: string }): Observable<{ data: Academy[] }>;
  listAcademies(data: {}): Observable<{ data: Academy[] }>;
  searchAcademies(data: { term: string }): Observable<{ data: Academy[] }>;
}
