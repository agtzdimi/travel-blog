import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Parse from 'parse';
import { BehaviorSubject, Observable } from 'rxjs';

/*
The login service utilizes the Parse functions and classes
It contains methodes to check if a user is authenticated & has write access.
It contains also the API functions to log in and log out
*/
Parse.initialize('NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi');
Parse.serverURL = 'http://localhost:5000/parse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginMessage = '';
  // BehaviorSubject holds one value. When it is subscribed it emits the value immediately
  private loggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router) {
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
    const ACLpermissionsByIdAttr = 'permissionsById';
    const ACLWriteAttr = 'write';
    return Parse.User.current().getACL()[ACLpermissionsByIdAttr]['*'][
      ACLWriteAttr
    ]
      ? true
      : false;
  }

  public login(username: string, password: string): void {
    Parse.User.logIn(username, password).then(
      (authenticateData) => {
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        this.loginMessage = error['message'];
      }
    );
  }

  public isUserLoggedIn(): Observable<boolean> {
    this.loggedIn.next(this.isAuthenticated());
    return this.loggedIn;
  }

  /* This is a workaround for logging out
   The logOut function did not work with the router and the user had to manually refresh the page
   to be redirected to login screen. Instead of letting the user refresh the implementation forces
   a refresh after the function execution
  */
  public logout(): void {
    this.loggedIn.next(false);
    Parse.User.logOut().then(window.location.reload());
  }
}
