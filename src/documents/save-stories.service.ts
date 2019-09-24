import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SAVE_STORY_SCHEMA } from './mocks/save-story-schema.mock';

@Injectable()
export class SaveStoriesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Ved/StorySave.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            'table[id*="ContentPage_Grid"]',
            value.data,
          );
          const entities = dataGrid.extract(SAVE_STORY_SCHEMA);
          return entities.map(entity => ({ ...entity, academyId }));
        }),
      );
  }

  fetchByDocumentId({ academyId, documentId }) {
    return this.fetch(academyId, { id: documentId });
  }
}
