import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from './chrono-entry';
import { ChronoList } from './chrono-list';
import { ChronoListDto } from './chrono-list-dto';

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
    const appDataLists = JSON.parse(appDataJSON) as ChronoListDto[];

    if (appDataLists !== null) {
      this.lists = appDataLists.map((dataList) => {
        const list = new ChronoList(dataList.id, dataList._name, dataList._description);
        list.createdOn = parseISO(dataList.createdOn);
        list.modifiedOn = parseISO(dataList.modifiedOn);
        list.deletedOn = parseISO(dataList.deletedOn);
        list.listItems = dataList.listItems.map((dataEntry) => {
          const entry = new ChronoEntry();
          entry.id = dataEntry.id;
          entry.listId = dataEntry.listId;
          entry.entryText = dataEntry.entryText;
          entry.entryDate = parseISO(dataEntry.entryDate);
          entry.createdOn = parseISO(dataEntry.createdOn);
          entry.modifiedOn = parseISO(dataEntry.modifiedOn);
          entry.deletedOn = parseISO(dataEntry.deletedOn);
          return entry;
        });
        return list;
      });
    }
  }
}
