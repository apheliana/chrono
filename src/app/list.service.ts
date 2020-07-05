import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from './list';
import { ListItem } from './list-item';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly localStorageKey = '@forCrowd/chrono/data';
  lists: List[] = [];

  constructor() {
    this.init();
  }

  createList(listName: string): Observable<List> {
    // TODO listName validation

    const newList = new List();

    // TODO Temporary solution until we have a database
    if (this.lists.length > 0) {
      newList.id = this.lists[this.lists.length - 1].id + 1;
    }

    newList.name = listName;
    this.lists.push(newList);

    return this.save().pipe(map(() => newList));
  }

  createEntry(selectedList: List, entryText: string, entryDate: Date): Observable<List> {
    const newEntry = new ListItem();
    newEntry.entryText = entryText;
    newEntry.entryDate = entryDate;
    // TODO This will be solved 👇
    //newListItem.list = selectedList;
    newEntry.listId = selectedList.id;
    selectedList.listItems.push(newEntry);

    // TODO We may have to sort the items when there's a new entry

    return this.save().pipe(map(() => selectedList));
  }

  getListById(listId: number): List {
    // TODO listId validation
    return this.lists.find((list) => list.id === listId);
  }

  private init(): void {
    const appDataJSON = localStorage.getItem(this.localStorageKey);
    const appDataLists = JSON.parse(appDataJSON) as List[];

    if (appDataLists !== null) {
      this.lists = appDataLists.map((dataList) => {
        const list = new List();
        list.id = dataList.id;
        list.name = dataList.name;
        list.listItems = dataList.listItems;
        return list;
      });
    }
  }

  private save(): Observable<void> {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.lists));
    return of(null);
  }
}
