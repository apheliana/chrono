import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {parseISO} from 'date-fns';


@Component({
  selector: 'your-lists',
  templateUrl: './your-lists.page.html',
  styleUrls: ['./your-lists.page.scss'],
})
export class YourListsComponent {
  dateActualText : string = '';
  listName: string = '';
  titleText: string = '';
  titleURL: string = '';
  lists = new FormControl();
  listOfLists: string[] = ['Articles', 'Books', 'TV Shows'];
  

  constructor() {

    const myListItem = new ListItem();
    myListItem.id = 0;
    myListItem.listId = 123;
    myListItem.titleText = this.titleText;
    myListItem.titleURL = this.titleURL;
    myListItem.dateActual = parseISO(this.dateActualText);
    myListItem.dateCreated = new Date();
    myListItem.dateModified = new Date();
    myListItem.dateDeleted = new Date();

    const myList = new List();
    myList.id = 123;
    myList.name = this.listName;
    //myList.listItem.push(myListItem);
    myList.dateCreated = new Date();
    myList.dateModified = new Date();
    myList.dateDeleted = new Date();

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