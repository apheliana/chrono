import { ChronoList } from '../list/chrono-list';

export class ChronoUser {
  id = 0;
  userName = '';
  emailAddress = '';
  readonly userLists: ChronoList[] = [];

  constructor(id: number, userName: string, emailAddress: string) {
    this.id = id;
    this.userName = userName;
    this.emailAddress = emailAddress;
  }
}
