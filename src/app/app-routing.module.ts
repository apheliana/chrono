import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './pages/entries/entries.page';
import { ListsPage } from './pages/lists/lists.page';
import { CreateUserPage } from './pages/user/create-user.page';

const routes: Routes = [
  { path: ':user-name/list/:list-id', component: EntriesPage },
  { path: ':user-name', component: ListsPage },
  { path: '', component: CreateUserPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
