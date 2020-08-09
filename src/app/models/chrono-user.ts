import { ChronoList } from './chrono-list';

export class ChronoUser {
  id = 0;
  userName = '';
  emailAddress = '';
  userLists: ChronoList[] = [];

  constructor(id: number, userName: string, emailAddress: string) {
    this.id = id;
    this.userName = userName;
    this.emailAddress = emailAddress;
  }
}
