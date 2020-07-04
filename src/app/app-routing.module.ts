import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsPage } from './lists.page';
import { ListDetailsPage } from './list-details.page';

const routes: Routes = [
  { path: "list/:list-id", component: ListDetailsPage },
  { path: "lists", component: ListsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
