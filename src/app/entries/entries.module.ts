import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntriesRoutingModule } from './entries-routing.module';
import { EntriesPageModule } from './entries/entries.page.module';

@NgModule({
  imports: [CommonModule, EntriesPageModule, EntriesRoutingModule],
})
export class EntriesModule {}
