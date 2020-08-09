import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { EntryDialogData } from './entry-dialog-data';
import { EntryDialogModel } from './entry-dialog-model';
import { EntryDialogComponent } from './entry-dialog.component';
import { EntryDialogModule } from './entry-dialog.component.module';

@Component({
  template: '',
})
class DialogTesterComponent implements OnInit {
  @Input()
  data: EntryDialogData = null;

  @Output()
  afterClosed = new EventEmitter<EntryDialogModel>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.open();
  }

  private open(): void {
    const dialogRef = this.dialog.open<EntryDialogComponent, EntryDialogData, EntryDialogModel>(EntryDialogComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((model) => {
      this.afterClosed.emit(model);
    });
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

export const Create = () => ({
  component: DialogTesterComponent,
  props: {
    data: {
      model: {
        entryTitle: '',
        entryDate: new Date(),
      },
      viewMode: 'create',
    },
    afterClosed: action('afterClosed'),
  },
});

export const Update = () => ({
  component: DialogTesterComponent,
  props: {
    data: {
      model: {
        entryTitle: 'title?',
        entryDate: new Date(2000, 1, 1),
      },
      viewMode: 'update',
    },
    afterClosed: action('afterClosed'),
  },
});
