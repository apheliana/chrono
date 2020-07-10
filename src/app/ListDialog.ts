import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './DialogData';

@Component({
  selector: 'list-dialog',
  templateUrl: 'list-dialog.html',
})
export class ListDialog {
  constructor(public dialogRef: MatDialogRef<ListDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
