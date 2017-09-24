import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authSerivce: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authSerivce.isLoggedIn();
  }

}
