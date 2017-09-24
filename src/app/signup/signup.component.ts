import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';
import { User } from '../_models/user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  user: User;
  errors: any;
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  signUp(formData: any): boolean {
    this.user = new User(formData);
    this.authService.signUp(this.user).subscribe((data: any) => {
      if (data.token) {
        this.authService.setUserToken(data.token);
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      } else {
        this.authService.removeUserToken();
        this.isLoggedIn = false;
      }
    }, (err: any) => {
      this.errors = JSON.parse(err.error);
      this.isLoggedIn = false;
      this.authService.removeUserToken();
    });
    return false;
  }
}
