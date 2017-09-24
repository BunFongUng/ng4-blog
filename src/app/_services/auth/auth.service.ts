import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../_models/user';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private API_URL: string) {
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/user`, user);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/user/login`, { email, password});
  }

  public getUserToken(): any {
    return localStorage.getItem('currentUser');
  }

  public removeUserToken(): void {
    localStorage.removeItem('currentUser');
  }

  public isLoggedIn(): boolean {
    return this.getUserToken() !== null;
  }

  public setUserToken(token: string): void {
    let obj: any = {};
    obj.token = token;

    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  public logout(): Observable<any> {
    return this.http.delete(`${this.API_URL}/user/logout`);
  }
}
