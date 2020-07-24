import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './pages/entries/entries.page';
import { ListsPage } from './pages/lists/lists.page';
import { UserPage } from './pages/user/user.page';

const routes: Routes = [
  { path: 'list/:list-id', component: EntriesPage },
  { path: 'lists', component: ListsPage },
  { path: '', component: UserPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
