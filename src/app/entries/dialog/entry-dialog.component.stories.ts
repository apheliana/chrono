import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { tap } from 'rxjs/operators';
import { EntryDialogData } from './entry-dialog-data';
import { EntryDialogModel } from './entry-dialog-model';
import { EntryDialogComponent } from './entry-dialog.component';
import { EntryDialogModule } from './entry-dialog.component.module';

@Component({
  template: '<button (click)="open()">open</button>',
})
export class DialogTesterComponent {
  constructor(private dialog: MatDialog) {
    console.log('tester');
  }

  open(): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData>(EntryDialogComponent, {
      data: {
        model: {
          entryTitle: '',
          entryDate: new Date(),
        },
        viewMode: 'create',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((model: EntryDialogModel) => {
          console.log('model', model);
        })
      )
      .subscribe();
  }
}

export default {
  title: '2-Components/Entry dialog',
  component: DialogTesterComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [EntryDialogComponent],
      imports: [BrowserAnimationsModule, EntryDialogModule],
    }),
  ],
};

export const Default = () => ({
  component: DialogTesterComponent,
});
