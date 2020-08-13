import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './user/users.page';

const routes: Routes = [
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: ':user-name/:list-id',
    loadChildren: () => import('./entries/entries.module').then((m) => m.EntriesModule),
  },
  {
    path: ':user-name',
    loadChildren: () => import('./lists/lists.module').then((m) => m.ListsModule),
  },
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
