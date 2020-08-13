import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EntriesPage } from './entries.page';
import { ManageEntryDialogModule } from './manage-entry/manage-entry.dialog.module';

@NgModule({
  declarations: [EntriesPage],
  exports: [EntriesPage],
  imports: [CommonModule, MatButtonModule, ManageEntryDialogModule],
})
export class EntriesPageModule {}
