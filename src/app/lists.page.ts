import { Component } from '@angular/core';
import { List } from './list';
import { ListService } from './list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  listName: string = '';
  selectedList: List = null;

  get lists(): List[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService) {}

  createList(): void {
    this.listService.createList(this.listName).subscribe();
  }
}
