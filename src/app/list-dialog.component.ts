import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListDialogInput } from './list-dialog-input';

@Component({
  templateUrl: 'list-dialog.component.html',
  styleUrls: ['list-dialog.component.scss'],
})
export class ListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListDialogInput
  ) {}
}
