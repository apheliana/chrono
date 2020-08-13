import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
