import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  url: string; // url for sign in, sign up or reset password
  pageTitle = 'Sign In';
  actionButtonText = 'Sign In';

  constructor(
    private readonly router: Router,
    private readonly auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.url = this.router.url.substr(1);
    if (this.url === 'signup') {
      this.pageTitle = 'Create an account';
      this.actionButtonText = 'Create Account';
    }

    if (this.url === 'reset') {
      this.pageTitle = 'Reset Password';
      this.actionButtonText = 'Reset Password';
    }
  }

  handleUserCredentials(userCredentials): void {
    const { email, password } = userCredentials;
    switch (this.url) {
      case 'login':
        this.login(email, password);
        break;
      case 'signup':
        this.signup(email, password);
        break;
      case 'reset':
        this.resetPassword(email);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.auth.login(email, password);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error, 'Either user doesn`t exist or wrong credentials');
    }
  }

  async signup(email: string, password: string) {
    try {
      await this.auth.signup(email, password);
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error, 'Sign up failed, please try again later');
    }
  }

  async resetPassword(email: string) {
    try {
      await this.auth.resetPassword(email);
      console.log('Email sent');
      this.router.navigateByUrl('');
    } catch (error) {
      console.log(error, 'Error trying to reset password');
    }
  }
}
