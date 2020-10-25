import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManageListDialogModule } from 'src/app/lists/manage-list/manage-list.dialog.module';
import { ManageEntryDialogModule } from '../manage-entry/manage-entry.dialog.module';
import { EntriesPage } from './entries.page';

@NgModule({
  declarations: [EntriesPage],
  exports: [EntriesPage],
  imports: [CommonModule, MatButtonModule, MatIconModule, ManageEntryDialogModule, ManageListDialogModule],
})
export class EntriesPageModule {}
