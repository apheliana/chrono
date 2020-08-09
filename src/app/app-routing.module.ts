import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './pages/entries/entries.page';
import { ListsPage } from './pages/lists/lists.page';
import { CreateUserPage } from './pages/user/create-user.page';
import { UsersPage } from './pages/user/users.page';

const routes: Routes = [
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
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
