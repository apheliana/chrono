import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { ChronoList } from '../../components/list/chrono-list';
import { ListDialogData } from '../../components/list/dialog/list-dialog-data';
import { ListDialogModel } from '../../components/list/dialog/list-dialog-model';
import { ListDialogComponent } from '../../components/list/dialog/list-dialog.component';
import { ListService } from '../../services/list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  userName: string;
  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private listService: ListService,
    private router: Router
  ) {
    this.userName = this.activatedRoute.snapshot.params['user-name'];
    console.log('userNAme:', this.userName);
  }

  createListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogData>(ListDialogComponent, {
      data: {
        model: {
          name: '',
          description: '',
        },
        viewMode: 'create',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model: ListDialogModel) => {
          if (!model) {
            return of(null);
          }

          return this.listService.createList(model.name, model.description).pipe(
            tap((list) => {
              this.router.navigate([this.userName, 'list', list.id]);
            })
          );
        })
      )
      .subscribe();
  }
}
