import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageEntryDialogData } from './manage-entry.dialog.data';

@Component({
  styleUrls: ['manage-entry.dialog.scss'],
  templateUrl: 'manage-entry.dialog.html',
})
export class ManageEntryDialog {
  constructor(
    public dialogRef: MatDialogRef<ManageEntryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ManageEntryDialogData
  ) {}
}
