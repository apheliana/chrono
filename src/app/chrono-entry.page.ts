import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChronoList } from './chrono-list';
import { DialogData } from './DialogData';
import { ListService } from './list.service';
import { ListDialog } from './ListDialog';

@Component({
  templateUrl: './chrono-entry.page.html',
  styleUrls: ['./chrono-entry.page.scss'],
})
export class ChronoEntryPage implements OnInit {
  entryDate: Date = new Date();
  entryText: string = '';
  selectedList: ChronoList = null;

  constructor(private activatedRoute: ActivatedRoute, private listService: ListService, public dialog: MatDialog) {}

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

  openDialog(viewState: string): void {
    const dialogRef = this.dialog.open(ListDialog, {
      width: '250px',
      data: { name: this.selectedList.name, description: this.selectedList.description, viewState: viewState },
    });

    dialogRef.afterClosed().subscribe((data: DialogData) => {
      if (!data || viewState != 'update') {
        return;
      }
      this.listService.updateList(this.selectedList, data);
    });
  }

  // TODO Update entry?
  // TODO Delete entry?
}
