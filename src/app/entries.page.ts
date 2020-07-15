import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ChronoList } from './chrono-list';
import { EntryDialogInput } from './entry-dialog-input';
import { EntryDialogOutput } from './entry-dialog-output';
import { EntryDialogComponent } from './entry-dialog.component';
import { ListDialogInput } from './list-dialog-input';
import { ListDialogOutput } from './list-dialog-output';
import { ListDialogComponent } from './list-dialog.component';
import { ListService } from './list.service';

@Component({
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage {
  selectedList: ChronoList = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private listService: ListService,
    private router: Router
  ) {
    const listIdParam = this.activatedRoute.snapshot.params['list-id'];
    if (!listIdParam) {
      this.router.navigate(['lists']);
      return;
    }

    const listId = Number(listIdParam);
    const list = this.listService.getListById(listId);

    if (!list) {
      this.router.navigate(['lists']);
      return;
    }

    this.selectedList = list;
  }

  createEntryDialog(): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogInput>(EntryDialogComponent, {
      data: { viewMode: 'create' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((data: EntryDialogOutput) => {
          if (!data) {
            return of(null);
          }

          return this.listService.createEntry(this.selectedList, data.entryTitle, data.entryDate).pipe();
        })
      )
      .subscribe();
  }

  updateListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogInput>(ListDialogComponent, {
      data: { name: this.selectedList.name, description: this.selectedList.description, viewMode: 'update' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((data: ListDialogOutput) => {
          if (!data) {
            return of(null);
          }

          this.selectedList.name = data.name;
          this.selectedList.description = data.description;

          return this.listService.save();
        })
      )
      .subscribe();
  }

  // TODO Delete entry?
}
