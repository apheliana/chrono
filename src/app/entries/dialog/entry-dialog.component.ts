import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryDialogData } from './entry-dialog-data';

@Component({
  templateUrl: 'entry-dialog.component.html',
  styleUrls: ['entry-dialog.component.scss'],
})
export class EntryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntryDialogData
  ) {}
}
