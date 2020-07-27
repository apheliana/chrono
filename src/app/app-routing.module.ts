import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './pages/entries/entries.page';
import { ListsPage } from './pages/lists/lists.page';
import { PageNotFoundPage } from './pages/page-not-found/page-not-found.page';
import { CreateUserPage } from './pages/user/create-user.page';
import { UsersPage } from './pages/user/users.page';

const routes: Routes = [
  { path: 'create-user', component: CreateUserPage },
  { path: ':user-name/:list-id', component: EntriesPage },
  { path: ':user-name', component: ListsPage },
  { path: '', component: UsersPage },
  {
    path: '404',
    component: PageNotFoundPage,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
