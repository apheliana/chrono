import { Component } from '@angular/core';
import { ChronoEntry } from 'src/app/components/entry/chrono-entry';
import { ChronoList } from 'src/app/components/list/chrono-list';
import { ChronoUser } from '../../components/user/chrono-user';

@Component({
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  userName = 'apheliana';
  userMail = 'mail.mail.com';
  userPassword = 'pass';
  entryDate = new Date();

  showUsersPage() {
    const chronoUser = new ChronoUser(0, this.userName, this.userMail, this.userPassword);
    const chronoList = new ChronoList(0, 1, 'list name', 'list desc');
    const chronoEntry = new ChronoEntry(2, 1, 'entry title', this.entryDate);
    chronoList.listItems.push(chronoEntry);
    chronoUser.userLists.push(chronoList);
    console.log('chrono user:', chronoUser);
  }
}
