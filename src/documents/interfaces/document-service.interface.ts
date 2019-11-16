import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { SaveStory } from '../models/save-story.model';

export interface DocumentService {
  getDocument(data: { id: number; academyId: string }): Observable<Document>;
  listDocumentSaveStories(data: {
    id: number;
    academyId: string;
  }): Observable<{ data: SaveStory[] }>;
}
