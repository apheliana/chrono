import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsPage } from './lists/lists.page';

const routes: Routes = [
  {
    path: '',
    component: ListsPage,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ListsRoutingModule {}
