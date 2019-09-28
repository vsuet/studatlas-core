import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SAVE_STORY_SCHEMA } from './mocks/save-story-schema.mock';
import { Academy } from '../academies/models/academy.model';

@Injectable()
export class SaveStoriesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get('/Ved/StorySave.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            'table[id*="ContentPage_Grid"]',
            value.data,
          );
          return dataGrid.extract(SAVE_STORY_SCHEMA, academy);
        }),
      );
  }

  fetchByDocumentId(id: number, academy: Academy) {
    return this.fetch(academy, { id });
  }
}
