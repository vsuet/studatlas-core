import { Observable } from 'rxjs';
import { Statistics } from '../models/statistics.model';
import { ListStatisticsRequest } from './list-statistics-request.interface';

export interface StatisticsService {
  listDivisionsStatistics(
    data: ListStatisticsRequest,
  ): Observable<{ data: Statistics[] }>;
  listFacultiesStatistics(
    data: ListStatisticsRequest,
  ): Observable<{ data: Statistics[] }>;
}
