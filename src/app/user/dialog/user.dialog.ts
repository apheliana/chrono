import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialogData } from './user.dialog.data';

@Component({
  styleUrls: ['user.dialog.scss'],
  templateUrl: 'user.dialog.html',
})
export class UserDialog {
  constructor(public dialogRef: MatDialogRef<UserDialog>, @Inject(MAT_DIALOG_DATA) public data: UserDialogData) {}
}
