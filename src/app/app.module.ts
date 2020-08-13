import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsPage } from './lists/lists.page';
import { ManageListDialogModule } from './lists/manage-list/manage-list.dialog.module';
import { CreateUserPage } from './user/create-user.page';
import { UserDialogComponent } from './user/dialog/user-dialog.component';
import { UsersPage } from './user/users.page';

@NgModule({
  declarations: [AppComponent, CreateUserPage, ListsPage, UsersPage, UserDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    AppRoutingModule,
    ManageListDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
