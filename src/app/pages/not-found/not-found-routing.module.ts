import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './not-found.page';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPage,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class NotFoundRoutingModule {}
