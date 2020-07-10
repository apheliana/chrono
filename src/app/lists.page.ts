import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChronoList } from './chrono-list';
import { DialogData } from './DialogData';
import { ListService } from './list.service';
import { ListDialog } from './ListDialog';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService, public dialog: MatDialog) {}

  openDialog(viewState: string): void {
    const dialogRef = this.dialog.open(ListDialog, {
      width: '250px',
      data: { name: '', description: '', viewState: viewState },
    });

    dialogRef.afterClosed().subscribe((data: DialogData) => {
      if (!data || viewState != 'create') {
        return;
      }
      this.listService.createList(data.name, data.description);
    });
  }
}
