import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from '../components/entry/chrono-entry';
import { ChronoList } from '../components/list/chrono-list';
import { ChronoListDto } from '../components/list/chrono-list-dto';
import { ChronoUser } from '../components/user/chrono-user';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  readonly users: ChronoUser[] = [];
  private readonly localStorageKey = '@forCrowd/chrono/data@v1.2';

  createEntry(list: ChronoList, entryTitle: string, entryDate: Date): Observable<ChronoEntry> {
    const newEntry = new ChronoEntry(new Date().getTime(), list.id, entryTitle, entryDate);
    list.listItems.push(newEntry);

    // TODO We may have to sort the items when there's a new entry

    return this.save().pipe(map(() => newEntry));
  }

  createList(userId: number, name: string, description: string = null): Observable<ChronoList> {
    const foundUser = this.users.find((user) => user.id === userId);

    if (foundUser === null) {
      // TODO Not found
    }

    // TODO Temporarily solution until we have a proper back-end
    const list = new ChronoList(new Date().getTime(), userId, name, description);

    foundUser.userLists.push(list);

    return this.save().pipe(map(() => list));
  }

  getUsers(): Observable<ChronoUser[]> {
    this.init(); // TODO This should load from the API
    return of(this.users);
  }

  getListById(userId: number, listId: number): ChronoList {
    const foundUser = this.users.find((user) => user.id === userId);

    if (foundUser === null) {
      // TODO Not found
    }

    const foundList = foundUser.userLists.find((list) => list.id === listId);

    if (!foundList) {
      throw new Error(`No list found by listId: ${listId}`);
    }

    return foundList;
  }

  save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.users));
    return of(null);
  }

  private init(): void {
    const appDataJSON = localStorage.getItem(this.localStorageKey);
    const appDataLists = JSON.parse(appDataJSON) as ChronoListDto[];

    if (appDataLists === null) {
      const apheliana = new ChronoUser(new Date().getTime(), 'apheliana', 'fatih@gmail.com');
      const coni2k = new ChronoUser(new Date().getTime(), 'coni2k', 'serkanholat@hotmail.com');

      this.users.push(apheliana);
      this.users.push(coni2k);
    } else {
      // appDataLists.forEach((dataList) => {
      //   const list = new ChronoList(dataList._id, dataList._userId, dataList._name, dataList._description);
      //   list.createdOn = parseISO(dataList.createdOn);
      //   list.modifiedOn = parseISO(dataList.modifiedOn);
      //   list.deletedOn = parseISO(dataList.deletedOn);
      //   list.listItems = dataList.listItems.map((dataEntry) => {
      //     const entry = new ChronoEntry(
      //       dataEntry._id,
      //       dataEntry._listId,
      //       dataEntry._entryTitle,
      //       parseISO(dataEntry._entryDate)
      //     );
      //     entry.createdOn = parseISO(dataEntry.createdOn);
      //     entry.modifiedOn = parseISO(dataEntry.modifiedOn);
      //     entry.deletedOn = parseISO(dataEntry.deletedOn);
      //     return entry;
      //   });
      //   this.lists.push(list);
      // });
    }
  }
}
