import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChronoEntryPage } from './chrono-entry.page';
import { ListsPage } from './lists.page';

const routes: Routes = [
  { path: 'list/:list-id', component: ChronoEntryPage },
  { path: 'lists', component: ListsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
