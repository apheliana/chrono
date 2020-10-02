import { ChronoList } from './chrono-list';

export class ChronoUser {
  id = 0;
  userName = '';
  emailAddress = '';
  readonly userLists: ChronoList[] = [];
  userListsRetrieved = false; // TODO Hacky solution I

  // TODO Create a constructor that takes "jsonData" as a parameter
  constructor(id: number, userName: string, emailAddress: string) {
    this.id = id;
    this.userName = userName;
    this.emailAddress = emailAddress;
  }
}
