import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryDialogComponent } from './components/entry/dialog/entry-dialog.component';
import { ListDialogComponent } from './components/list/dialog/list-dialog.component';
import { EntriesPage } from './pages/entries/entries.page';
import { ListsPage } from './pages/lists/lists.page';
import { CreateUserPage } from './pages/user/create-user.page';

@NgModule({
  declarations: [AppComponent, EntriesPage, EntryDialogComponent, ListsPage, ListDialogComponent, CreateUserPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
