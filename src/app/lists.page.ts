import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
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

  constructor(private dialog: MatDialog, private listService: ListService, private router: Router) {}

  createListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogInput>(ListDialogComponent, {
      data: { viewMode: 'create' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((data: ListDialogOutput) => {
          if (!data) {
            return of(null);
          }

          return this.listService.createList(data.name, data.description).pipe(
            tap((list) => {
              this.router.navigate(['list', list.id]);
            })
          );
        })
      )
      .subscribe();
  }
}
