import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map, shareReplay } from 'rxjs/operators';
import { ChronoEntry } from './models/chrono-entry';
import { ChronoList } from './models/chrono-list';
import { ChronoListDto } from './models/chrono-list-dto';
import { ChronoUser } from './models/chrono-user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private usersCache$: Observable<ChronoUser[]>;

  constructor(private httpClient: HttpClient) {}

  createEntry(list: ChronoList, entryTitle: string, entryDate: Date): Observable<ChronoEntry> {
    const entry = new ChronoEntry(new Date().getTime(), list.id, entryTitle, entryDate, null);

    // TODO We may have to sort the items when there's a new entry

    const url = 'api/chrono-entry';
    return this.httpClient.post<ChronoEntry>(url, entry).pipe(
      map((response) => {
        list.listItems.push(entry);
        return entry;
      })
    );
  }

  createList(user: ChronoUser, name: string, description: string = null): Observable<ChronoList> {
    const list = new ChronoList(new Date().getTime(), user.id, name, description);
    list.listItemsRetrieved = true;

    const url = 'api/chrono-list';
    return this.httpClient.post<ChronoList>(url, list).pipe(
      map((response) => {
        user.userLists.push(list);
        return list;
      })
    );
  }

  createUser(userName: string, emailAddress: string): Observable<ChronoUser> {
    return this.getChronoUsers().pipe(
      flatMap((users) => {
        const user = new ChronoUser(new Date().getTime(), userName, emailAddress);
        users.push(user);

        const url = 'api/user';
        return this.httpClient.post<ChronoUser>(url, user).pipe(
          map((response) => {
            return user;
          })
        );
      })
    );
  }

  getChronoUsers(): Observable<ChronoUser[]> {
    if (!this.usersCache$) {
      const url = 'api/user/all';
      this.usersCache$ = this.httpClient.get<ChronoUser[]>(url).pipe(
        map((result) => {
          return result.map((item) => {
            return new ChronoUser(item.id, item.userName, '');
          });
        }),
        shareReplay()
      );
    }

    return this.usersCache$;
  }

  getChronoUser(userName: string): Observable<ChronoUser> {
    return this.usersCache$.pipe(
      flatMap((users) => {
        let user = users.find((item) => item.userName === userName);

        if (user && user.userListsRetrieved) {
          return of(user);
        }

        const url = `api/user/${userName}`;
        return this.httpClient.get<ChronoUser>(url).pipe(
          map((response) => {
            if (!response) {
              // TODO Double check this approach
              throw new Error(`No user found by username: ${userName}`);
            }

            if (!user) {
              user = new ChronoUser(response.id, response.userName, response.emailAddress);
              users.push(user);
            }

            response.userLists.forEach((item) => {
              const list = new ChronoList(item.id, item.userId, item.name, item.description);
              user.userLists.push(list);
            });
            user.userListsRetrieved = true;

            return user;
          })
        );
      })
    );
  }

  getChronoList(userName: string, listId: number): Observable<ChronoList> {
    return this.getChronoUser(userName).pipe(
      flatMap((user) => {
        const url = `api/chrono-list/${userName}/${listId}`;

        let list = user.userLists.find((item) => item.id === listId);

        if (list && list.listItemsRetrieved) {
          return of(list);
        }

        return this.httpClient.get<ChronoListDto>(url).pipe(
          map((response) => {
            if (!response) {
              // TODO Double check this approach
              throw new Error(`No list found by listId: ${listId}`);
            }

            if (!list) {
              list = new ChronoList(response.id, response.userId, response.name, response.description);
              user.userLists.push(list);
            }

            response.listItems.forEach((item) => {
              const entry = new ChronoEntry(item.id, item.listId, item.entryTitle, null, item.entryDate);
              list.listItems.push(entry);
            });
            list.listItemsRetrieved = true;

            return list;
          })
        );
      })
    );
  }

  updateChronoEntry(): Observable<void> {
    const url = 'api/chrono-entry';
    return this.httpClient.put<void>(url, {});
  }

  updateChronoList(): Observable<void> {
    const url = 'api/chrono-list';
    return this.httpClient.put<void>(url, {});
  }
}
