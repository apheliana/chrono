import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ChronoUser } from '../models/chrono-user';
import { UserDialog } from './dialog/user.dialog';
import { UserDialogData } from './dialog/user.dialog.data';
import { UserDialogModel } from './dialog/user.dialog.model';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  users: ChronoUser[] = [];

  constructor(private dialog: MatDialog, private appService: AppService, private router: Router) {
    this.appService.getChronoUsers().subscribe((users) => {
      this.users = users;
    });
  }

  createUserDialog(): void {
    const dialogRef = this.dialog.open<UserDialog, UserDialogData, UserDialogModel>(UserDialog, {
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
        flatMap((model) => {
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
