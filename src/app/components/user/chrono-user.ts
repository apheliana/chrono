import { ChronoList } from '../list/chrono-list';

export class ChronoUser {
  id = 0;
  userName = '';
  emailAddress = '';
  password = '';
  userLists: ChronoList[] = [];

  constructor(id: number, userName: string, userMail: string, userPassword: string) {
    this.id = id;
    this.userName = userName;
    this.emailAddress = userMail;
    this.password = userPassword;
  }
}
