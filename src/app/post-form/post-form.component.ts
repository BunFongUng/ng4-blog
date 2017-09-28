import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post/service/post.service';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  isLoggedIn: boolean;
  form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private postService: PostService) {
    this.form = fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public createPost(body: any) {
    this.postService.createPost(body).subscribe();
  }
}
