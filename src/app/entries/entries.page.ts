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
import { ManageEntryDialog } from './manage-entry/manage-entry.dialog';
import { ManageEntryDialogData } from './manage-entry/manage-entry.dialog.data';
import { ManageEntryDialogModel } from './manage-entry/manage-entry.dialog.model';

@Component({
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage {
  selectedList: ChronoList = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private dialog: MatDialog,
    private router: Router
  ) {
    const userName = this.activatedRoute.snapshot.params['user-name'];
    const listId = Number(this.activatedRoute.snapshot.params['list-id']);

    if (!userName || !listId) {
      this.router.navigate(['not-found']);
      return;
    }

    const list = this.appService.getListByUserName(userName, listId);

    if (!list) {
      this.router.navigate(['not-found']);
      return;
    }

    this.selectedList = list;
  }

  createEntryDialog(): void {
    const dialogRef = this.dialog.open<ManageEntryDialog, ManageEntryDialogData, ManageEntryDialogModel>(
      ManageEntryDialog,
      {
        data: {
          model: {
            entryTitle: '',
            entryDate: new Date(),
          },
          viewMode: 'create',
        },
      }
    );

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
    const dialogRef = this.dialog.open<ManageEntryDialog, ManageEntryDialogData, ManageEntryDialogModel>(
      ManageEntryDialog,
      {
        data: {
          model: {
            entryTitle: item.entryTitle,
            entryDate: item.entryDate,
          },
          viewMode: 'update',
        },
      }
    );

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
