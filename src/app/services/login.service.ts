import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SessionData = { "isLoggedIn": boolean , "timeout": number };

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>({"isLoggedIn": false, "timeout": 0});

  constructor() { }

  login() {
    this.isLoggedIn.next({"isLoggedIn": true, "timeout": 300});
  }

  logout(redirectUrl: string) {
    //TODO add a navigation back to login page
    this.isLoggedIn.next({"isLoggedIn": false, "timeout": 0});
  }
}
