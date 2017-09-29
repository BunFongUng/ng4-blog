import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert/alert.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe((message: any) => {
      this.message = message;
    });
  }

}
