import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
//import {format, parseISO} from 'date-fns'; //for printing a more user friendly date on screen


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
  yourLists: List[] = [];
  listIdCounter: number = 0;
  listItemIdCounter: number = 0;
  whichList: number = 0;
  viewLists: string = 'no';
  viewListItems: string = 'no';

  constructor() {
    const yourListsJSON = localStorage.getItem('your-lists');
    const yourLists = JSON.parse(yourListsJSON) as List[];

    if (yourLists !== null) {
      this.viewLists = 'yes';
      this.yourLists = yourLists.map(dataItem => {
        const yourList = new List();
        yourList.id = dataItem.id;
        if (dataItem.id >= this.listIdCounter) { this.listIdCounter = dataItem.id + 1; }
        yourList.name = dataItem.name;
        return yourList;
      });
    }
  
    const yourListItemsJSON = localStorage.getItem('your-list-items');
    const yourListItems = JSON.parse(yourListItemsJSON) as ListItem[];

    if (yourListItems !== null) {
      this.viewListItems = 'yes';
      this.yourListItems = yourListItems.map(dataItem => {
        const yourListItem = new ListItem();
        yourListItem.id = dataItem.id;
        if (dataItem.id >= this.listItemIdCounter) { this.listItemIdCounter = dataItem.id + 1; }
        yourListItem.listId = dataItem.listId;
        yourListItem.titleText = dataItem.titleText;
        return yourListItem;
      });
    }
  }
  
  addNewListItem(): void {
    const yourListItem = new ListItem();
    yourListItem.id = this.listItemIdCounter;
    this.listItemIdCounter++;
    yourListItem.listId = this.whichList;
    yourListItem.titleText = this.titleText;
    yourListItem.titleURL = this.titleURL;
    yourListItem.dateActual = this.dateActual;
    yourListItem.dateCreated = new Date();
    yourListItem.dateModified = new Date();
    yourListItem.dateDeleted = new Date();
    this.yourListItems.push(yourListItem);
    localStorage.setItem('your-list-items', JSON.stringify(this.yourListItems));
  }

  addNewList(): void {
    const yourList = new List();
    yourList.id = this.listIdCounter;
    this.listIdCounter++;
    yourList.name = this.listName;
    yourList.dateCreated = new Date();
    yourList.dateModified = new Date();
    yourList.dateDeleted = new Date();
    this.yourLists.push(yourList);
    localStorage.setItem('your-lists', JSON.stringify(this.yourLists));
  }
}



export class List {
  id: number; //unique //find the last id then add 1
  name: string;
  listItem: ListItem[];
  dateCreated: Date;
  dateModified: Date;
  dateDeleted: Date;
}

export class ListItem {
  id: number; //unique //find the last id then add 1
  listId: number; //which list is this item in
  titleText: string;
  titleURL: string; //check if its valid URL, decapitalize all add http and www if necessary
  dateActual: Date;
  dateCreated: Date;
  dateModified: Date; //could we be able see earlier versions of the item?
  dateDeleted: Date;
}