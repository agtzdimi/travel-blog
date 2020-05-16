import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Parse from 'parse';
import { BehaviorSubject, Observable } from 'rxjs';

// Parse Initialization
Parse.initialize('NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi');
Parse.serverURL = 'http://localhost:5000/parse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginMessage = '';
  // BehaviorSubject holds one value. When it is subscribed it emits the value immediately
  private loggedIn: BehaviorSubject<boolean>;

  constructor(protected router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  public getLoginMessage(): string {
    return this.loginMessage;
  }

  public isAuthenticated(): boolean {
    return Parse.User.current() ? true : false;
  }

  public getUserSessionToken(): string {
    return Parse.User.current().getSessionToken();
  }

  public getUserWriteAccess(): boolean {
    const accessIDAttr = 'id';
    const ACLpermissionsByIdAttr = 'permissionsById';
    const ACLWriteAttr = 'write';
    const id = Parse.User.current()[accessIDAttr];
    return Parse.User.current().getACL()[ACLpermissionsByIdAttr][id][
      ACLWriteAttr
    ];
  }

  public login(username, password) {
    Parse.User.logIn(username, password).then(
      (authenticateData) => {
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        this.loginMessage = 'Invalid credentials!';
      }
    );
  }

  // Retrieve the Observable's value
  public isUserLoggedIn(): Observable<boolean> {
    this.loggedIn.next(this.isAuthenticated());
    return this.loggedIn;
  }

  public logout() {
    this.loggedIn.next(false);
    Parse.User.logOut().then((loggedOutData) => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
