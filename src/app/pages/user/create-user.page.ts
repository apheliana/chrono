import { Component } from '@angular/core';
import { ChronoUser } from 'src/app/components/user/chrono-user';

@Component({
  styleUrls: ['./create-user.page.scss'],
  templateUrl: './create-user.page.html',
})
export class CreateUserPage {
  emailAddress = 'apheliana@forcrowd.org';
  userName = '';

  createUser(): void {
    const chronoUser = new ChronoUser(new Date().getTime(), this.userName, this.emailAddress);
    console.log('chrono user:', chronoUser);
    // TODO Save and navigate to user's page (/apheliana)
  }
}
