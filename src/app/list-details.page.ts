import { Component, OnInit } from '@angular/core';
import { List } from './List';
import { ListService } from './list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  entryDate: Date = new Date();
  entryText: string = '';
  selectedList: List = null;

  constructor(private activatedRoute: ActivatedRoute, private listService: ListService) {
  }

  ngOnInit(): void {
    const listIdParam = this.activatedRoute.snapshot.params["list-id"];

    if (!listIdParam) {
      // TODO Handle this..
    }

    const listId = Number(listIdParam);
    this.selectedList = this.listService.getListById(listId);
  }

  createEntry(): void {
    this.listService.createEntry(this.selectedList, this.entryText, this.entryDate).subscribe();
  }

  // TODO Update entry?
  // TODO Delete entry?
}
