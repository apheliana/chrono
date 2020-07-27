import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChronoUser } from 'src/app/components/user/chrono-user';
import { ListService } from 'src/app/services/list.service';

@Component({
  styleUrls: ['./create-user.page.scss'],
  templateUrl: './create-user.page.html',
})
export class CreateUserPage {
  emailAddress = '';
  userName = '';
  constructor(private listService: ListService, private router: Router) {}

  get users(): ChronoUser[] {
    return this.listService.users;
  }

  createUser(): void {
    const chronoUser = new ChronoUser(new Date().getTime(), this.userName, this.emailAddress);
    this.users.push(chronoUser);
    console.log('chrono user:', chronoUser);
    this.router.navigate([this.userName]);
  }
}
