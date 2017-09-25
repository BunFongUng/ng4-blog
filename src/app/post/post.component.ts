import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth/auth.service';
import { PostService } from './service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isLoggedIn: boolean;
  posts: any[];
  constructor(private authService: AuthService, private postSerivce: PostService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.list();
  }

  public list() {
    this.postSerivce.list().subscribe((data: any) => {
      this.posts = data.data;
      console.log(this.posts);
      // this.posts = posts.dat
    });
  }
}
