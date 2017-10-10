import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth/auth.service';
import { PostService } from './service/post.service';
import { AlertService } from '../_services/alert/alert.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  isLoggedIn: boolean;
  posts: any[] = [];
  page: number = 1;
  limit: number = 1;
  total: number = 0;
  loading: boolean = false;
  offset: number;

  constructor(private authService: AuthService, private postSerivce: PostService, private alertService: AlertService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.list();
  }

  list(): void {
    this.offset = (this.page - 1) * this.limit;

    this.postSerivce.list({ skip: this.offset, limit: this.limit }).subscribe((data: any) => {
      if (data.status === 'success') {
        this.posts = data.data;
        this.total = data.total;
      } else {
        this.posts = [];
      }
    }, (err: any) => {
      this.posts = [];
    });
  }

  deletePost(postId: string): boolean {
    this.postSerivce.deletePost(postId).subscribe((data: any) => {
      if (data.status === 'success') {
        this.alertService.success('Successfully deleted.');
        this.list();
      } else {

      }
    }, (er: any) => {

    });
    return false;
  }

  nextPage(): void {
    this.page++;
    this.list();
  }

  prevPage(): void {
    this.page--;
    this.list();
  }

  goToPage(n: number): void {
    console.log(n);
    this.page = n;
    this.list();
  }
}
