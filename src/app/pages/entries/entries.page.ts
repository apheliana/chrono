import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ChronoEntry } from '../../components/entry/chrono-entry';
import { EntryDialogData } from '../../components/entry/dialog/entry-dialog-data';
import { EntryDialogModel } from '../../components/entry/dialog/entry-dialog-model';
import { EntryDialogComponent } from '../../components/entry/dialog/entry-dialog.component';
import { ChronoList } from '../../components/list/chrono-list';
import { ListDialogData } from '../../components/list/dialog/list-dialog-data';
import { ListDialogModel } from '../../components/list/dialog/list-dialog-model';
import { ListDialogComponent } from '../../components/list/dialog/list-dialog.component';
import { ListService } from '../../services/list.service';

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
    const list = this.listService.getListById(0, listId); // TODO Retrieve the current user

    if (!list) {
      this.router.navigate(['lists']);
      return;
    }

    this.selectedList = list;
  }

  createEntryDialog(): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData>(EntryDialogComponent, {
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
        flatMap((model: EntryDialogModel) => {
          if (!model) {
            return of(null);
          }

          return this.listService.createEntry(this.selectedList, model.entryTitle, model.entryDate).pipe();
        })
      )
      .subscribe();
  }

  updateEntryDialog(item: ChronoEntry): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData>(EntryDialogComponent, {
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
        flatMap((model: EntryDialogModel) => {
          if (!model) {
            return of(null);
          }
          item.entryTitle = model.entryTitle;
          item.entryDate = model.entryDate;
          return this.listService.save();
        })
      )
      .subscribe();
  }

  updateListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogData>(ListDialogComponent, {
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
        flatMap((model: ListDialogModel) => {
          if (!model) {
            return of(null);
          }

          this.selectedList.name = model.name;
          this.selectedList.description = model.description;

          return this.listService.save();
        })
      )
      .subscribe();
  }

  // TODO Delete entry?
}