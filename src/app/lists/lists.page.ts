import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { ChronoUser } from 'src/app/models/chrono-user';
import { AppService } from '../app.service';
import { UserDialogData } from '../user/dialog/user-dialog-data';
import { UserDialogModel } from '../user/dialog/user-dialog-model';
import { UserDialogComponent } from '../user/dialog/user-dialog.component';
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
    private appService: AppService,
    private router: Router
  ) {
    const userName = this.activatedRoute.snapshot.params['user-name'];

    if (!userName) {
      this.router.navigate(['not-found']);
      return;
    }

    this.selectedUser = this.appService.getUserByName(userName);

    if (!this.selectedUser) {
      this.router.navigate(['not-found']);
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

          return this.appService.createList(this.selectedUser, model.name, model.description).pipe(
            tap((list) => {
              this.router.navigate([this.selectedUser.userName, list.id]);
            })
          );
        })
      )
      .subscribe();
  }

  updateUserDialog(): void {
    const dialogRef = this.dialog.open<UserDialogComponent, UserDialogData>(UserDialogComponent, {
      data: {
        model: {
          userName: this.selectedUser.userName,
          emailAddress: this.selectedUser.emailAddress,
        },
        viewMode: 'update',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model: UserDialogModel) => {
          if (!model) {
            return of(null);
          }

          this.selectedUser.userName = model.userName;
          this.selectedUser.emailAddress = model.emailAddress;

          return this.appService.save();
        })
      )
      .subscribe();
  }
}
