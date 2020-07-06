import { Component } from '@angular/core';
import { ChronoList } from './chrono-list';
import { ListService } from './list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  listName: string = '';
  listDescription: string = '';
  selectedList: ChronoList = null;

  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService) {}

  createList(): void {
    this.listService.createList(this.listName, this.listDescription).subscribe();
  }
}
