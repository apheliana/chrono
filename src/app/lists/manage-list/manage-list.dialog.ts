import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageListDialogData } from './manage-list.dialog.data';

@Component({
  styleUrls: ['manage-list.dialog.scss'],
  templateUrl: 'manage-list.dialog.html',
})
export class ManageListDialog {
  constructor(
    public dialogRef: MatDialogRef<ManageListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ManageListDialogData
  ) {}
}
