import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth.service';
import { ChronoUser } from 'src/app/models/chrono-user';
import { UserDialog } from 'src/app/user/dialog/user.dialog';
import { UserDialogData } from 'src/app/user/dialog/user.dialog.data';
import { UserDialogModel } from 'src/app/user/dialog/user.dialog.model';
import { ManageListDialog } from '../manage-list/manage-list.dialog';
import { ManageListDialogData } from '../manage-list/manage-list.dialog.data';
import { ManageListDialogModel } from '../manage-list/manage-list.dialog.model';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  selectedUser: ChronoUser = null;

  get loggedInUser(): boolean {
    return this.authService.user.id === this.selectedUser?.id;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private appService: AppService,
    private router: Router
  ) {
    const userName = this.activatedRoute.snapshot.params['user-name'];

    if (!userName) {
      this.router.navigate(['not-found']);
      return;
    }

    this.appService.getChronoUser(userName).subscribe((user) => {
      this.selectedUser = user;

      if (!this.selectedUser) {
        this.router.navigate(['not-found']);
        return;
      }
    });
  }

  createListDialog(): void {
    const dialogRef = this.dialog.open<ManageListDialog, ManageListDialogData, ManageListDialogModel>(
      ManageListDialog,
      {
        data: {
          model: {
            name: '',
            description: '',
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
    const dialogRef = this.dialog.open<UserDialog, UserDialogData, UserDialogModel>(UserDialog, {
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
        flatMap((model) => {
          if (!model) {
            return of(null);
          }

          this.selectedUser.userName = model.userName;
          this.selectedUser.emailAddress = model.emailAddress;

          return this.appService.updateChronoList();
        })
      )
      .subscribe();
  }
}
