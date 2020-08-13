import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UsersPageModule } from './users.page.module';

@NgModule({
  imports: [CommonModule, UsersPageModule, UserRoutingModule],
})
export class UserModule {}
