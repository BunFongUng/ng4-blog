import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../_services/auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = this.injector.get(AuthService);
    let tokenStr: any = auth.getUserToken();
    let tokenObj: any = JSON.parse(tokenStr);
    let token = (tokenObj) ? tokenObj.token : '';
    request = request.clone({
      setHeaders: {
        'x-auth': token
      }
    });

    return next.handle(request);
  }
}
