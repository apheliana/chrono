import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './entries/entries.page';
import { ListsPage } from './lists/lists.page';
import { CreateUserPage } from './user/create-user.page';
import { UsersPage } from './user/users.page';

const routes: Routes = [
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  { path: 'create-user', component: CreateUserPage },
  { path: ':user-name/:list-id', component: EntriesPage },
  { path: ':user-name', component: ListsPage },
  { path: '', component: UsersPage },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
