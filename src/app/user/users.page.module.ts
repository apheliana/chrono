import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserDialogModule } from './dialog/user.dialog.module';
import { UsersPage } from './users.page';

@NgModule({
  declarations: [UsersPage],
  exports: [UsersPage],
  imports: [CommonModule, RouterModule, MatButtonModule, UserDialogModule],
})
export class UsersPageModule {}
