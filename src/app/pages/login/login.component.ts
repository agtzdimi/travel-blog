import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/theme/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;

  constructor(private loginService: LoginService, protected router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  public onLogin(): void {
    this.loginService.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );
  }

  public redirectHome() {
    this.router.navigateByUrl('/home');
  }

  public getLoginMessage(): string {
    return this.loginService.getLoginMessage();
  }
}
