import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from './models/chrono-entry';
import { ChronoList } from './models/chrono-list';
import { ChronoUser } from './models/chrono-user';
import { ChronoUserDto } from './models/chrono-user-dto';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly users: ChronoUser[] = [];
  private readonly localStorageKey = '@forCrowd/chrono/data@v1.4';

  createEntry(list: ChronoList, entryTitle: string, entryDate: Date): Observable<ChronoEntry> {
    const newEntry = new ChronoEntry(new Date().getTime(), list.id, entryTitle, entryDate);
    list.listItems.push(newEntry);

    // TODO We may have to sort the items when there's a new entry

    return this.save().pipe(map(() => newEntry));
  }

  createList(user: ChronoUser, name: string, description: string = null): Observable<ChronoList> {
    // TODO Temporarily solution until we have a proper back-end
    const list = new ChronoList(new Date().getTime(), user.id, name, description);

    user.userLists.push(list);

    return this.save().pipe(map(() => list));
  }

  createUser(userName: string, emailAddress: string) {
    const user = new ChronoUser(new Date().getTime(), userName, emailAddress);
    this.users.push(user);
    return this.save().pipe(map(() => user));
  }

  getUsers(): Observable<ChronoUser[]> {
    this.init(); // TODO This should load from the API
    return of(this.users);
  }

  getUserByName(userName: string): ChronoUser {
    const foundUser = this.users.find((user) => user.userName === userName);
    if (foundUser === null) {
      throw new Error(`No user found called: ${userName}`);
    }
    return foundUser;
  }

  getListByUserName(userName: string, listId: number): ChronoList {
    const foundUser = this.getUserByName(userName);
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
    const appDataLists = JSON.parse(appDataJSON) as ChronoUserDto[];

    if (appDataLists === null) {
      // const apheliana = new ChronoUser(new Date().getTime(), 'apheliana', 'fatih@gmail.com');
      // const coni2k = new ChronoUser(new Date().getTime() + 1, 'coni2k', 'serkanholat@hotmail.com');
      // this.users.push(apheliana);
      // this.users.push(coni2k);
    } else {
      appDataLists.forEach((dataUser) => {
        const user = new ChronoUser(dataUser.id, dataUser.userName, dataUser.emailAddress);
        user.id = dataUser.id;
        user.userName = dataUser.userName;
        user.emailAddress = dataUser.emailAddress;
        user.userLists = dataUser.userLists.map((dataList) => {
          const list = new ChronoList(dataList._id, dataList._userId, dataList._name, dataList._description);
          list.createdOn = parseISO(dataList.createdOn);
          list.modifiedOn = parseISO(dataList.modifiedOn);
          list.deletedOn = parseISO(dataList.deletedOn);
          list.listItems = dataList.listItems.map((dataEntry) => {
            const entry = new ChronoEntry(
              dataEntry._id,
              dataEntry._listId,
              dataEntry._entryTitle,
              parseISO(dataEntry._entryDate)
            );
            entry.createdOn = parseISO(dataEntry.createdOn);
            entry.modifiedOn = parseISO(dataEntry.modifiedOn);
            entry.deletedOn = parseISO(dataEntry.deletedOn);
            return entry;
          });
          return list;
        });
        this.users.push(user);
      });
    }
  }
}