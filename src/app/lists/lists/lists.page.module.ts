import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { ManageListDialogModule } from '../manage-list/manage-list.dialog.module';
import { ListsPage } from './lists.page';

@NgModule({
  declarations: [ListsPage],
  exports: [ListsPage],
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatRadioModule, ManageListDialogModule],
})
export class ListsPageModule {}
