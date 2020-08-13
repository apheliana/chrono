import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
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
