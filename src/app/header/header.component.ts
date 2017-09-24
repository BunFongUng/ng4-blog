import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {

  }

  public logout(): void {
    this.authService.logout().subscribe((data: any) => {
      if (data.status === 'success') {
        this.authService.removeUserToken();
        this.isLoggedIn = this.authService.isLoggedIn();
        this.router.navigate(['/home']);
      }
    }, (err: any) => {
      console.log('error', err);
    });
  }
}
