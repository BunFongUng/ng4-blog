import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth/auth.service';
import { PostService } from '../post/service/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isLoggedIn: boolean;
  form: FormGroup;
  showSuccessMessage: boolean;
  showErrorMessage: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder, private postService: PostService) {
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
      console.log(data);
      if (data.status === 'success') {

      }
    }, (err: any) => {
      console.log(err);
    });
  }
}
