import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsPage } from './list-details.page';
import { ListsPage } from './lists.page';

const routes: Routes = [
  { path: 'list/:list-id', component: ListDetailsPage },
  { path: 'lists', component: ListsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
