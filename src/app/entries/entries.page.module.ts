import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { EntriesPage } from './entries.page';

@NgModule({
  declarations: [EntriesPage],
  exports: [EntriesPage],
  imports: [CommonModule, MatDialogModule],
})
export class EntriesPageModule {}
