import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DocumentDetails } from './classes/document-details.class';
import { Academy } from '../academies/models/academy.model';

@Injectable()
export class DocumentsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get('/Ved/Ved.aspx', {
        baseURL: academy.endpoint,
        params,
      })
      .pipe(
        map(value => {
          return new DocumentDetails(value.data).extractAll(academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id });
  }
}
