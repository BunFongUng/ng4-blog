import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public doLogin(formData): void {
    this.authService.login(formData.email, formData.password).subscribe((data: any) => {
      if (data.token) {
        this.authService.setUserToken(data.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.authService.removeUserToken();
      }
    }, (err: any) => {
      console.log(err);
      this.authService.removeUserToken();
    });
  }
}
