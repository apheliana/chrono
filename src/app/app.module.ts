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
import { ManageEntryDialogModule } from './entries/dialog/manage-entry.dialog.module';
import { EntriesPage } from './entries/entries.page';
import { ListDialogComponent } from './lists/dialog/list-dialog.component';
import { ListsPage } from './lists/lists.page';
import { CreateUserPage } from './user/create-user.page';
import { UserDialogComponent } from './user/dialog/user-dialog.component';
import { UsersPage } from './user/users.page';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserPage,
    EntriesPage,
    ListDialogComponent,
    ListsPage,
    UsersPage,
    UserDialogComponent,
  ],
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
    ManageEntryDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
