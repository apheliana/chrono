import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YourListsComponent } from './your-lists.page';

const routes: Routes = [
  { path: "your-lists", component: YourListsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
