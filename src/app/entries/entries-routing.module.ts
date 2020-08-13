import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesPage } from './entries/entries.page';

const routes: Routes = [
  {
    path: '',
    component: EntriesPage,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class EntriesRoutingModule {}
