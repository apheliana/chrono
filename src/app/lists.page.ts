import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChronoList } from './chrono-list';
import { ListDialogInput } from './list-dialog-input';
import { ListDialogOutput } from './list-dialog-output';
import { ListDialogComponent } from './list-dialog.component';
import { ListService } from './list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService, private dialog: MatDialog) {}

  createListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogInput>(ListDialogComponent, {
      data: { viewMode: 'create' },
    });

    dialogRef.afterClosed().subscribe((data: ListDialogOutput) => {
      if (!data) {
        return;
      }

      this.listService.createList(data.name, data.description);
    });
  }
}
