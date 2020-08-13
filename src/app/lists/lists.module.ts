import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsPageModule } from './lists/lists.page.module';

@NgModule({
  imports: [CommonModule, ListsPageModule, ListsRoutingModule],
})
export class ListsModule {}
