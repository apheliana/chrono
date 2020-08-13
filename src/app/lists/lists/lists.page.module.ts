import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ManageListDialogModule } from '../manage-list/manage-list.dialog.module';
import { ListsPage } from './lists.page';

@NgModule({
  declarations: [ListsPage],
  exports: [ListsPage],
  imports: [CommonModule, RouterModule, MatButtonModule, ManageListDialogModule],
})
export class ListsPageModule {}
