import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {
  constructor(@Inject('BASE_URL') private API_URL: string, private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${this.API_URL}/post`);
  }

  public createPost(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/post`, body);
  }

  public getPost(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/post/${id}`);
  }

  public deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/post/${id}`);
  }

  public updatePost(id: string, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/post/${id}`, body);
  }
}
