import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import { ManageListDialog } from 'src/app/lists/manage-list/manage-list.dialog';
import { ManageListDialogData } from 'src/app/lists/manage-list/manage-list.dialog.data';
import { ManageListDialogModel } from 'src/app/lists/manage-list/manage-list.dialog.model';
import { ChronoEntry } from 'src/app/models/chrono-entry';
import { ChronoList } from 'src/app/models/chrono-list';
import { ManageEntryDialog } from '../manage-entry/manage-entry.dialog';
import { ManageEntryDialogData } from '../manage-entry/manage-entry.dialog.data';
import { ManageEntryDialogModel } from '../manage-entry/manage-entry.dialog.model';

@Component({
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage {
  selectedList: ChronoList = null;

  get loggedInUser(): boolean {
    return this.authService.user.id === this.selectedList?.userId;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
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

    this.appService.getChronoList(userName, listId).subscribe((list) => {
      if (!list) {
        this.router.navigate(['not-found']);
        return;
      }

      this.selectedList = list;
    });
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
          return this.appService.updateChronoEntry();
        })
      )
      .subscribe();
  }

  updateListDialog(): void {
    const dialogRef = this.dialog.open<ManageListDialog, ManageListDialogData, ManageListDialogModel>(
      ManageListDialog,
      {
        data: {
          model: {
            name: this.selectedList.name,
            description: this.selectedList.description,
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

          this.selectedList.name = model.name;
          this.selectedList.description = model.description;

          return this.appService.updateChronoList();
        })
      )
      .subscribe();
  }

  // TODO Delete entry?
}
