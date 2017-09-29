import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AlertService {
  private subject = new Subject<any> ();
  private keepAfterNavigationChange: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  public success(message: string, keepAfterNavigationChange: boolean = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  public error(message: string, keepAfterNavigationchange: boolean = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationchange;
    this.subject.next({ type: 'error', text: message });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
