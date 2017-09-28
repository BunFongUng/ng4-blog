import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

      } else {

      }
    });
  }

}
