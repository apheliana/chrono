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
    let listId = 0;
    if (this.lists.length > 0) {
      listId = this.lists[this.lists.length - 1].id + 1;
    }
    const list = new ChronoList(listId, name, description);

    this.lists.push(list);

    return this.save().pipe(map(() => list));
  }

  getListById(listId: number): ChronoList {
    // TODO listId validation
    return this.lists.find((list) => list.id === listId);
  }

  save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
    return of(null);
  }

  private init(): void {
    const appDataJSON = localStorage.getItem(this.localStorageKey);
    const appDataLists = JSON.parse(appDataJSON) as ChronoList[];

    if (appDataLists !== null) {
      this.lists = appDataLists.map((dataList) => {
        const list = new ChronoList(dataList.id, dataList.name, dataList.description);
        // TODO CreatedOn, ModifiedOn?
        list.listItems = dataList.listItems; // TODO This needs to be updated with object initialization
        return list;
      });
    }
  }
}
