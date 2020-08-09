import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ChronoUser } from '../models/chrono-user';
import { UserDialogData } from './dialog/user-dialog-data';
import { UserDialogModel } from './dialog/user-dialog-model';
import { UserDialogComponent } from './dialog/user-dialog.component';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  get users(): ChronoUser[] {
    return this.appService.users;
  }

  constructor(private dialog: MatDialog, private appService: AppService, private router: Router) {}

  createUserDialog(): void {
    const dialogRef = this.dialog.open<UserDialogComponent, UserDialogData>(UserDialogComponent, {
      data: {
        model: {
          userName: '',
          emailAddress: '',
        },
        viewMode: 'create',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        flatMap((model: UserDialogModel) => {
          if (!model) {
            return of(null);
          }

          return this.appService.createUser(model.userName, model.emailAddress).pipe(
            tap(() => {
              this.router.navigate([model.userName]);
            })
          );
        })
      )
      .subscribe();
  }
}
