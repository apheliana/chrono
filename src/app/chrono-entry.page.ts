import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChronoList } from './chrono-list';
import { ListService } from './list.service';

@Component({
  templateUrl: './chrono-entry.page.html',
  styleUrls: ['./chrono-entry.page.scss'],
})
export class ChronoEntryPage implements OnInit {
  entryDate: Date = new Date();
  entryText: string = '';
  selectedList: ChronoList = null;

  constructor(private activatedRoute: ActivatedRoute, private listService: ListService) {}

  ngOnInit(): void {
    const listIdParam = this.activatedRoute.snapshot.params['list-id'];

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
