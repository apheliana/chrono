import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageModule } from './not-found.page.module';

@NgModule({
  imports: [CommonModule, NotFoundPageModule, NotFoundRoutingModule],
})
export class NotFoundModule {}
