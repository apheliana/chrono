import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChronoUser } from 'src/app/components/user/chrono-user';

@Component({
  styleUrls: ['./create-user.page.scss'],
  templateUrl: './create-user.page.html',
})
export class CreateUserPage {
  emailAddress = '';
  userName = '';
  constructor(private router: Router) {}

  createUser(): void {
    const chronoUser = new ChronoUser(new Date().getTime(), this.userName, this.emailAddress);
    console.log('chrono user:', chronoUser);
    this.router.navigate([this.userName]);
  }
}
