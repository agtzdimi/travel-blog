import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient, protected router: Router) {}

  public login(username: string, password: string) {
    const creadentials = {
      username: username,
      password: password
    };
    console.log(username, password);
    this.router.navigateByUrl('/home');
    const url = '';
    /* this.httpClient.post(url, creadentials).subscribe(
      data => {
        this.router.navigateByUrl('/home');
      },
      error => {}
    ); */
  }
}
