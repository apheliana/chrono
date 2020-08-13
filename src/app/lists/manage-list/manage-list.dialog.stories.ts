import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { ManageListDialog } from './manage-list.dialog';
import { ManageListDialogData } from './manage-list.dialog.data';
import { ManageListDialogModel } from './manage-list.dialog.model';
import { ManageListDialogModule } from './manage-list.dialog.module';

@Component({
  template: '',
})
class ManageListDialogComponent implements OnInit {
  @Input()
  data: ManageListDialogData = null;

  @Output()
  afterClosed = new EventEmitter<ManageListDialogModel>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.open();
  }

  private open(): void {
    const dialogRef = this.dialog.open<ManageListDialog, ManageListDialogData, ManageListDialogModel>(
      ManageListDialog,
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
  title: '2-Components/Manage list dialog',
  component: ManageListDialogComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [ManageListDialog],
      imports: [BrowserAnimationsModule, ManageListDialogModule],
    }),
  ],
};

export const Create = () => ({
  component: ManageListDialogComponent,
  props: {
    data: {
      model: {
        name: '',
        description: null,
      },
      viewMode: 'create',
    },
    afterClosed: action('afterClosed'),
  },
});

export const Update = () => ({
  component: ManageListDialogComponent,
  props: {
    data: {
      model: {
        name: 'List',
        description: 'Description',
      },
      viewMode: 'update',
    },
    afterClosed: action('afterClosed'),
  },
});
