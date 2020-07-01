import { Component } from '@angular/core';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListService } from './list.service';

@Component({
  selector: 'your-lists',
  templateUrl: './your-lists.page.html',
  styleUrls: ['./your-lists.page.scss'],
})
export class YourListsComponent {
  dateActual: Date;
  listName: string = '';
  titleText: string = '';
  titleURL: string = '';
  yourListItems: ListItem[] = [];
  listIdCounter: number = 0;
  listItemIdCounter: number = 0;
  whichList: number = 0;
  viewListItems: string = 'no';

  get lists(): List[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService) {
  }

  addNewListItem(): void {
    // TODO Move this to list.service as createListItem(list: List, entryText, entryDate) 👇
    // const yourListItem = new ListItem();

    // yourListItem.id = this.listItemIdCounter;
    // this.listItemIdCounter++;

    // yourListItem.list = list;
    // yourListItem.listId = list.Id;
    // yourListItem.entryText = this.titleText;
    // yourListItem.entryDate = this.dateActual;
    // yourListItem.dateCreated = new Date();
    // yourListItem.dateModified = new Date();
    // yourListItem.dateDeleted = new Date();
    // this.yourListItems.push(yourListItem);
    // localStorage.setItem('your-list-items', JSON.stringify(this.yourListItems));
  }

  addNewList(): void {
    this.listService.createList(this.listName).subscribe(newList => {
      console.log('list saved', newList);
      console.log('yourLists', this.lists);
    });
  }
}
