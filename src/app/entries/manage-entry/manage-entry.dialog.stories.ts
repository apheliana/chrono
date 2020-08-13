import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { ManageEntryDialog } from './manage-entry.dialog';
import { ManageEntryDialogData } from './manage-entry.dialog.data';
import { ManageEntryDialogModel } from './manage-entry.dialog.model';
import { ManageEntryDialogModule } from './manage-entry.dialog.module';

@Component({
  template: '',
})
class ManageEntryDialogComponent implements OnInit {
  @Input()
  data: ManageEntryDialogData = null;

  @Output()
  afterClosed = new EventEmitter<ManageEntryDialogModel>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.open();
  }

  private open(): void {
    const dialogRef = this.dialog.open<ManageEntryDialog, ManageEntryDialogData, ManageEntryDialogModel>(
      ManageEntryDialog,
      {
        data: this.data,
      }
    );

    dialogRef.afterClosed().subscribe((model) => {
      this.afterClosed.emit(model);
    });
  }
}

export default {
  title: '2-Components/Manage entry dialog',
  component: ManageEntryDialogComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [ManageEntryDialog],
      imports: [BrowserAnimationsModule, ManageEntryDialogModule],
    }),
  ],
};

export const Create = () => ({
  component: ManageEntryDialogComponent,
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
  component: ManageEntryDialogComponent,
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
