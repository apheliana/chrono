import { Injectable } from '@angular/core';
import { List } from './List';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListItem } from './ListItem';

@Injectable({
  providedIn: 'root',
})
export class ListService {

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

    return this.save().pipe(
      map(() => newList)
    );
  }

  private init(): void {
    const yourListsJSON = localStorage.getItem('chrono-lists');
    const yourLists = JSON.parse(yourListsJSON) as List[];

    if (yourLists !== null) {
      this.lists = yourLists.map(dataItem => {
        const list = new List();
        list.id = dataItem.id;
        list.name = dataItem.name;
        return list;
      });
    }

    // TODO This block shouldn't be necessary, since when we save/load lists, it should already take care of its child items

    // const yourListItemsJSON = localStorage.getItem('your-list-items');
    // const yourListItems = JSON.parse(yourListItemsJSON) as ListItem[];

    // if (yourListItems !== null) {
    //   this.yourListItems = yourListItems.map(dataItem => {
    //     const yourListItem = new ListItem();
    //     yourListItem.id = dataItem.id;
    //     if (dataItem.id >= this.listItemIdCounter) { this.listItemIdCounter = dataItem.id + 1; }
    //     yourListItem.listId = dataItem.listId;
    //     yourListItem.entryText = dataItem.entryText;
    //     return yourListItem;
    //   });
    // }   
  }

  private save(): Observable<void> {
    localStorage.setItem('chrono-lists', JSON.stringify(this.lists));
    return of(null);
  }
}
