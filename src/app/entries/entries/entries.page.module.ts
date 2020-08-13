import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ManageEntryDialogModule } from '../manage-entry/manage-entry.dialog.module';
import { EntriesPage } from './entries.page';

@NgModule({
  declarations: [EntriesPage],
  exports: [EntriesPage],
  imports: [CommonModule, MatButtonModule, ManageEntryDialogModule],
})
export class EntriesPageModule {}
