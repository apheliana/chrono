import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { UserDialog } from './user.dialog';
import { UserDialogData } from './user.dialog.data';
import { UserDialogModel } from './user.dialog.model';
import { UserDialogModule } from './user.dialog.module';

@Component({
  template: '',
})
class UserDialogComponent implements OnInit {
  @Input()
  data: UserDialogData = null;

  @Output()
  afterClosed = new EventEmitter<UserDialogModel>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.open();
  }

  private open(): void {
    const dialogRef = this.dialog.open<UserDialog, UserDialogData, UserDialogModel>(UserDialog, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((model) => {
      this.afterClosed.emit(model);
    });
  }
}

export default {
  title: '2-Components/User dialog',
  component: UserDialogComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [UserDialog],
      imports: [BrowserAnimationsModule, UserDialogModule],
    }),
  ],
};

export const Create = () => ({
  component: UserDialogComponent,
  props: {
    data: {
      model: {
        userName: '',
        emailAddress: '',
      },
      viewMode: 'create',
    },
    afterClosed: action('afterClosed'),
  },
});

export const Update = () => ({
  component: UserDialogComponent,
  props: {
    data: {
      model: {
        userName: 'User name',
        emailAddress: 'user@name.com',
      },
      viewMode: 'update',
    },
    afterClosed: action('afterClosed'),
  },
});
