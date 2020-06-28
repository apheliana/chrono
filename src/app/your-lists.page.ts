import { Component } from '@angular/core';

@Component({
  selector: 'your-lists',
  templateUrl: './your-lists.page.html',
  styleUrls: ['./your-lists.page.scss'],
})
export class YourListsComponent {
  title = 'Your Lists';
}

export class List {
  id: number = 0; //unique
  name: string = '';
  listItem: ListItem[] = [];
  dateCreated: Date = new Date();
  dateModified: Date = new Date();
  dateDeleted: Date = new Date();
}

export class ListItem {
  id: number; //unique
  listId: number; //which list is this item in
  titleText: string;
  titleURL: string; //optional
  dateActual: Date = new Date();
  dateCreated: Date = new Date();
  dateModified: Date = new Date(); //could we be able see earlier versions of the item?
  dateDeleted: Date = new Date();

}