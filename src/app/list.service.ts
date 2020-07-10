import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from './chrono-entry';
import { ChronoList } from './chrono-list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  lists: ChronoList[] = [];
  private readonly localStorageKey = '@forCrowd/chrono/data';

  constructor() {
    this.init();
  }

  createEntry(selectedList: ChronoList, entryText: string, entryDate: Date): Observable<ChronoList> {
    const newEntry = new ChronoEntry();
    newEntry.entryText = entryText;
    newEntry.entryDate = entryDate;
    // TODO This will be solved 👇
    //newListItem.list = selectedList;
    newEntry.listId = selectedList.id;
    selectedList.listItems.push(newEntry);

    // TODO We may have to sort the items when there's a new entry

    return this.save().pipe(map(() => selectedList));
  }

  createList(name: string, description: string = null): Observable<ChronoList> {
    return this.createOrUpdateList(name, description);
  }

  getListById(listId: number): ChronoList {
    // TODO listId validation
    return this.lists.find((list) => list.id === listId);
  }

  updateList(name: string, description: string, list: ChronoList): Observable<ChronoList> {
    return this.createOrUpdateList(name, description, list);
  }

  private createOrUpdateList(
    name: string,
    description: string = null,
    list: ChronoList = null
  ): Observable<ChronoList> {
    name = (name || '').trim();
    if (name === null || name === '') {
      throw new Error('Invalid argument');
    }

    description = (description || '').trim();
    if (description === '') description = null;

    if (!list) {
      list = new ChronoList();

      // TODO Temporary solution until we have a database
      if (this.lists.length > 0) {
        list.id = this.lists[this.lists.length - 1].id + 1;
      }

      this.lists.push(list);
    } else {
      list.modifiedOn = new Date();
    }

    list.name = name;
    list.description = description;

    return this.save().pipe(map(() => list));
  }

  private init(): void {
    const appDataJSON = localStorage.getItem(this.localStorageKey);
    const appDataLists = JSON.parse(appDataJSON) as ChronoList[];

    if (appDataLists !== null) {
      this.lists = appDataLists.map((dataList) => {
        const list = new ChronoList();
        list.id = dataList.id;
        list.name = dataList.name;
        list.description = dataList.description;
        list.listItems = dataList.listItems; // TODO This needs to be updated with object initialization
        return list;
      });
    }
  }

  private save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
    return of(null);
  }
}
