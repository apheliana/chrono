import { Injectable } from '@angular/core';
import { parseISO } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChronoEntry } from '../components/entry/chrono-entry';
import { ChronoList } from '../components/list/chrono-list';
import { ChronoListDto } from '../components/list/chrono-list-dto';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  readonly lists: ChronoList[] = [];
  private readonly localStorageKey = '@forCrowd/chrono/data@v1';

  createEntry(list: ChronoList, entryTitle: string, entryDate: Date): Observable<ChronoEntry> {
    const newEntry = new ChronoEntry(0, list.id, entryTitle, entryDate);
    list.listItems.push(newEntry);

    // TODO We may have to sort the items when there's a new entry

    return this.save().pipe(map(() => newEntry));
  }

  createList(name: string, description: string = null): Observable<ChronoList> {
    // TODO Temporarily solution until we have a proper back-end
    let listId = 0;
    const userId = 0;
    if (this.lists.length > 0) {
      listId = this.lists[this.lists.length - 1].id + 1;
    }
    const list = new ChronoList(listId, userId, name, description);

    this.lists.push(list);

    return this.save().pipe(map(() => list));
  }

  getLists(): Observable<ChronoList[]> {
    this.init(); // TODO This should load from the API
    return of(this.lists);
  }

  getListById(listId: number): ChronoList {
    const foundList = this.lists.find((list) => list.id === listId);

    if (!foundList) {
      throw new Error(`No list found by listId: ${listId}`);
    }

    return foundList;
  }

  save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
    return of(null);
  }

  private init(): void {
    const appDataJSON = localStorage.getItem(this.localStorageKey);
    const appDataLists = JSON.parse(appDataJSON) as ChronoListDto[];

    if (appDataLists !== null) {
      appDataLists.forEach((dataList) => {
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

        this.lists.push(list);
      });
    }
  }
}
