import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { BOOK_SCHEMA } from './mocks/book-schema.mock';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly authService: AuthService,
    private readonly grabberService: GrabberService,
  ) {}

  managementClient = this.authService.createManagementClient({
    scope: 'read:users update:users',
  });

  async getWatchlist(userId: string): Promise<any[]> {
    const { user_metadata } = await this.managementClient.getUser({
      id: userId,
    });
    return !!user_metadata.books ? user_metadata.books : [];
  }

  async updateWatchlist(userId: string, watchlist: any[]): Promise<any[]> {
    const { user_metadata } = await this.managementClient.getUser({
      id: userId,
    });
    await this.managementClient.updateUserMetadata(
      { id: userId },
      { ...user_metadata, books: watchlist },
    );
    return watchlist;
  }

  async toggleWatchlist(
    userId: string,
    academyId: string,
    bookId: number,
    action: 'add' | 'remove',
  ): Promise<boolean> {
    let watchlist = await this.getWatchlist(userId);

    const isExists = watchlist.find(
      entry => entry.bookId === String(bookId) && entry.academyId === academyId,
    );

    switch (action) {
      case 'add': {
        if (isExists) {
          throw new ConflictException('Вы уже подписались на эту зачетку');
        }
        watchlist.push({ bookId, academyId });
        break;
      }
      case 'remove': {
        if (!isExists) {
          throw new NotFoundException('Вы уже отписались от этой зачетки  ');
        }
        watchlist = watchlist.filter(
          entry =>
            !(entry.bookId === String(bookId) && entry.academyId === academyId),
        );
        break;
      }
    }

    try {
      await this.updateWatchlist(userId, watchlist);
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return true;
  }

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'stud',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucStud"]', value.data);
          return dataGrid.extract(BOOK_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'stud' }).pipe(map(books => books[0]));
  }

  fetchByGroupId(groupId: number, academy: Academy) {
    return this.fetch(academy, { id: groupId, f: 'group' });
  }
}
