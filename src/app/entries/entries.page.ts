import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ListDialogData } from '../lists/dialog/list-dialog-data';
import { ListDialogModel } from '../lists/dialog/list-dialog-model';
import { ListDialogComponent } from '../lists/dialog/list-dialog.component';
import { ChronoEntry } from '../models/chrono-entry';
import { ChronoList } from '../models/chrono-list';
import { EntryDialogData } from './dialog/entry-dialog-data';
import { EntryDialogModel } from './dialog/entry-dialog-model';
import { EntryDialogComponent } from './dialog/entry-dialog.component';

@Component({
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage {
  selectedList: ChronoList = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private appService: AppService,
    private router: Router
  ) {
    const listIdParam = this.activatedRoute.snapshot.params['list-id'];
    const userName = this.activatedRoute.snapshot.params['user-name'];
    if (!listIdParam) {
      this.router.navigate(['not-found']);
      return;
    }

    const listId = Number(listIdParam);
    const list = this.appService.getListByUserName(userName, listId);

    if (!list) {
      this.router.navigate(['not-found']);
      return;
    }

    this.selectedList = list;
  }

  createEntryDialog(): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData, EntryDialogModel>(EntryDialogComponent, {
      data: {
        model: {
          entryTitle: '',
          entryDate: new Date(),
        },
        viewMode: 'create',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model) => {
          if (!model) {
            return of(null);
          }

          return this.appService.createEntry(this.selectedList, model.entryTitle, model.entryDate).pipe();
        })
      )
      .subscribe();
  }

  updateEntryDialog(item: ChronoEntry): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData, EntryDialogModel>(EntryDialogComponent, {
      data: {
        model: {
          entryTitle: item.entryTitle,
          entryDate: item.entryDate,
        },
        viewMode: 'update',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model) => {
          if (!model) {
            return of(null);
          }
          item.entryTitle = model.entryTitle;
          item.entryDate = model.entryDate;
          return this.appService.save();
        })
      )
      .subscribe();
  }

  updateListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogData, ListDialogModel>(ListDialogComponent, {
      data: {
        model: {
          name: this.selectedList.name,
          description: this.selectedList.description,
        },
        viewMode: 'update',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model) => {
          if (!model) {
            return of(null);
          }

          this.selectedList.name = model.name;
          this.selectedList.description = model.description;

          return this.appService.save();
        })
      )
      .subscribe();
  }

  // TODO Delete entry?
}
