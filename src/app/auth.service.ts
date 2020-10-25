import { Injectable } from '@angular/core';
import { ChronoUser } from './models/chrono-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get user(): ChronoUser {
    return this._user;
  }

  private _user: ChronoUser = new ChronoUser(3, 'Guest', 'guest@mail.com');
}
