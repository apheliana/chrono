import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ChronoUser } from 'src/app/models/chrono-user';

@Component({
  styleUrls: ['./create-user.page.scss'],
  templateUrl: './create-user.page.html',
})
export class CreateUserPage {
  emailAddress = '';
  userName = '';
  constructor(private appService: AppService, private router: Router) {}

  get users(): ChronoUser[] {
    return this.appService.users;
  }

  createUser(): void {
    this.appService.createUser(this.userName, this.emailAddress);
    this.router.navigate([this.userName]);
  }
}
