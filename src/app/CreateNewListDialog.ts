import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './DialogData';

@Component({
  selector: 'create-new-list-dialog',
  templateUrl: 'create-new-list-dialog.html',
})
export class CreateNewListDialog {
  constructor(public dialogRef: MatDialogRef<CreateNewListDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
