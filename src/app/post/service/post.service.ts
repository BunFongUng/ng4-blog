import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../model/post';

@Injectable()
export class PostService {
  constructor(@Inject('BASE_URL') private API_URL: string, private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${this.API_URL}/post`);
  }
}
