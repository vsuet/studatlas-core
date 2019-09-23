import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DocumentDetails } from './classes/document-details.class';

@Injectable()
export class DocumentsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Ved/Ved.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const document = new DocumentDetails(value.data).extractAll();
          return { ...document, academyId };
        }),
      );
  }

  fetchById({ academyId, documentId }) {
    return this.fetch(academyId, { id: documentId });
  }
}
