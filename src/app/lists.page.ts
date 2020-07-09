import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChronoList } from './chrono-list';
import { CreateNewListDialog } from './CreateNewListDialog';
import { DialogData } from './DialogData';
import { ListService } from './list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  selectedList: ChronoList = null;

  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewListDialog, {
      width: '250px',
      data: { listName: '', listDescription: '' },
    });

    dialogRef.afterClosed().subscribe((data: DialogData) => {
      if (!data) {
        return;
      }

      this.listService.createList(data.listName, data.listDescription);
    });
  }
}
