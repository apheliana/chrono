import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { ChronoUser } from 'src/app/components/user/chrono-user';
import { ChronoList } from '../../components/list/chrono-list';
import { ListDialogData } from './dialog/list-dialog-data';
import { ListDialogModel } from './dialog/list-dialog-model';
import { ListDialogComponent } from './dialog/list-dialog.component';
import { ListService } from '../../services/list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  userName = '';
  selectedUser: ChronoUser = null;
  lists: ChronoList[] = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private listService: ListService,
    private router: Router
  ) {
    this.userName = this.activatedRoute.snapshot.params['user-name'];
    this.selectedUser = this.listService.getUserByName(this.userName);
    if (!this.selectedUser) {
      this.router.navigate(['/404']);
    }
    this.lists = this.selectedUser.userLists;
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
