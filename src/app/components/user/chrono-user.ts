import { ChronoList } from '../list/chrono-list';

export class ChronoUser {
  id: number;
  userName: string;
  userMail: string;
  userPassword: string;
  userLists: ChronoList[] = [];

  private _id = 0;
  private _userName = '';
  private _userMail = '';
  private _userPassword = '';

  constructor(id: number, userName: string, userMail: string, userPassword: string) {
    this._id = id;
    this._userName = userName;
    this._userMail = userMail;
    this._userPassword = userPassword;
  }
}
