import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from './chrono-entry';
import { ChronoList } from './chrono-list';
import { DialogData } from './DialogData';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  lists: ChronoList[] = [];
  private readonly localStorageKey = '@forCrowd/chrono/data';

  constructor() {
    this.init();
  }

  createList(name: string, description: string = null): Observable<ChronoList> {
    name = (name || '').trim();
    if (name === null || name === '') {
      throw new Error('Invalid argument');
    }

    description = (description || '').trim();
    if (description === '') description = null;

    const newList = new ChronoList();

    // TODO Temporary solution until we have a database
    if (this.lists.length > 0) {
      newList.id = this.lists[this.lists.length - 1].id + 1;
    }

    newList.name = name;
    newList.description = description;
    this.lists.push(newList);

    return this.save().pipe(map(() => newList));
  }

  updateList(selectedList: ChronoList, data: DialogData): Observable<ChronoList> {
    data.name = (data.name || '').trim();
    if (data.name === null || data.name === '') {
      throw new Error('Invalid argument');
    }

    data.description = (data.description || '').trim();
    if (data.description === '') data.description = null;

    selectedList.name = data.name;
    selectedList.description = data.description;
    selectedList.modifiedOn = new Date();

    return this.save().pipe(map(() => selectedList));
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

  getListById(listId: number): ChronoList {
    // TODO listId validation
    return this.lists.find((list) => list.id === listId);
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
        list.listItems = dataList.listItems;
        list.numberOfEntries = dataList.listItems.length;
        return list;
      });
    }
  }

  private save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
    return of(null);
  }
}
