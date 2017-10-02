import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth/auth.service';
import { PostService } from '../post/service/post.service';
import { AlertService } from '../_services/alert/alert.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isLoggedIn: boolean;
  form: FormGroup;
  errors: any;

  constructor(private authService: AuthService, private fb: FormBuilder,
              private postService: PostService, private alertService: AlertService,
              private router: Router) {

    this.form = fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      text: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public createPost(body: any) {
    // console.log(body);
    this.postService.createPost(body).subscribe((data: any) => {
      if (data.status === 'success') {
        this.alertService.success('Successfully created post.', true);
        this.router.navigate(['/post']);
      } else {
        this.alertService.error('Could not create post.');
      }
    }, (err: any) => {
      this.errors = JSON.parse(err.error);
      this.alertService.error(this.errors.errors.title.msg);
    });
  }
}
