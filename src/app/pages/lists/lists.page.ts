import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { ChronoUser } from 'src/app/components/user/chrono-user';
import { ListService } from '../../services/list.service';
import { ListDialogData } from './dialog/list-dialog-data';
import { ListDialogModel } from './dialog/list-dialog-model';
import { ListDialogComponent } from './dialog/list-dialog.component';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  selectedUser: ChronoUser = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private listService: ListService,
    private router: Router
  ) {
    const userName = this.activatedRoute.snapshot.params['user-name'];

    if (!userName) {
      this.router.navigate(['/404']);
      return;
    }

    this.selectedUser = this.listService.getUserByName(userName);

    if (!this.selectedUser) {
      this.router.navigate(['/404']);
      return;
    }
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

          return this.listService.createList(this.selectedUser, model.name, model.description).pipe(
            tap((list) => {
              this.router.navigate([this.selectedUser.userName, list.id]);
            })
          );
        })
      )
      .subscribe();
  }
}
